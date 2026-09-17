const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const rideModel = require('../models/ride.model');
const captainModel = require('../models/captain.model');

const { publishEvent } = require('../kafka/producer');
const TOPICS = require('../kafka/topics');

/* ---------------- CREATE NORMAL RIDE ---------------- */

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType
    });

    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
    if (!pickupCoordinates) {
      return res.status(400).json({ message: 'Invalid pickup address' });
    }

    const { lat, lng } = pickupCoordinates;

    const nearbyCaptains = await captainModel.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: 4000
        }
      },
      'vehicle.vehicleType': vehicleType,
      // isOnline: true
    });

    ride.otp = '';

    const rideWithUser = await rideModel
      .findById(ride._id)
      .populate('user');

    for (const captain of nearbyCaptains) {
      await publishEvent(TOPICS.RIDE_CREATED, {
        rideId: ride._id.toString(),
        captainId: captain._id.toString(),
        event: 'new-ride',
        data: rideWithUser
      });
    }

    return res.status(201).json(ride);
  } catch (err) {
    console.error('Ride creation failed:', err);
    return res.status(500).json({ message: err.message });
  }
};

/* ---------------- GET FARE ---------------- */

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (err) {
    console.error('Fare calculation failed:', err);
    return res.status(500).json({ message: err.message });
  }
};

/* ---------------- CREATE ON-SIGHT RIDE ---------------- */

module.exports.createOnSightRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType, plateNumber } = req.body;

  try {
    const ride = await rideService.createOnSightRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
      plateNumber
    });

    const captain = await captainModel.findOne({
      'vehicle.plate': plateNumber,
      // isOnline: true
    });

    if (captain) {
      const rideWithUser = await rideModel
        .findById(ride._id)
        .populate('user');

      await publishEvent(TOPICS.RIDE_ON_SIGHT, {
        rideId: ride._id.toString(),
        captainId: captain._id.toString(),
        event: 'ride-on-sight',
        data: rideWithUser
      });
    }

    return res.status(201).json(ride);
  } catch (err) {
    console.error('On-sight ride creation failed:', err);
    return res.status(500).json({ message: err.message });
  }
};

/* ---------------- CONFIRM RIDE ---------------- */

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const ride = await rideService.confirmRide({
      rideId: req.body.rideId,
      captain: req.captain
    });

    await publishEvent(TOPICS.RIDE_CONFIRMED, {
      rideId: ride._id.toString(),
      userId: ride.user._id.toString(),
      event: 'ride-confirmed',
      data: ride
    });

    return res.status(200).json(ride);
  } catch (err) {
    console.error('Ride confirmation failed:', err);
    return res.status(500).json({ message: err.message });
  }
};

/* ---------------- START RIDE ---------------- */

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const ride = await rideService.startRide({
      rideId: req.query.rideId,
      otp: req.query.otp,
      captain: req.captain
    });

    await publishEvent(TOPICS.RIDE_STARTED, {
      rideId: ride._id.toString(),
      userId: ride.user._id.toString(),
      event: 'ride-started',
      data: ride
    });

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

/* ---------------- END RIDE ---------------- */

module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const ride = await rideService.endRide({
      rideId: req.body.rideId,
      captain: req.captain
    });

    await publishEvent(TOPICS.RIDE_ENDED, {
      rideId: ride._id.toString(),
      userId: ride.user._id.toString(),
      event: 'ride-ended',
      data: ride
    });

    return res.status(200).json(ride);
  } catch (err) {
    console.error('Ride end failed:', err);
    return res.status(500).json({ message: err.message });
  }
};