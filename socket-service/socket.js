const { Server } = require('socket.io');
const { createAdapter } = require('@socket.io/redis-adapter');
const { pubClient, subClient, connectRedis } = require('./redis');

const userModel = require('./models/user-socket.model');
const captainModel = require('./models/captain-socket.model');

let io;

async function initializeSocket(server) {
  // 1. Connect Redis
  await connectRedis();

  // 2. Init socket.io
  io = new Server(server, {
    cors: {
      origin: [
        'https://zeno-ride-v2.vercel.app',
        'https://www.zenoride.in',
        'http://localhost:5173'
      ],
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  // 3. Attach Redis adapter
  io.adapter(createAdapter(pubClient, subClient));

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('join', async ({ userId, userType }) => {
      console.log('JOIN EVENT:', userId, userType);

      // 🔑 JOIN ROOM (THIS IS THE IMPORTANT PART)
      socket.join(userId);

      // MongoDB update is now OPTIONAL
      if (userType === 'user') {
        await userModel.findByIdAndUpdate(userId, { online: true });
      } else if (userType === 'captain') {
        await captainModel.findByIdAndUpdate(userId, { online: true });
      }
    });

    socket.on('update-location-captain', async ({ userId, location }) => {
      if (!location || !location.ltd || !location.lng) {
        return socket.emit('error', { message: 'Invalid location data' });
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          type: 'Point',
          coordinates: [location.lng, location.ltd]
        }
      });
    });

    socket.on('disconnect', async () => {
      const userId = socket.data?.userId;

      if (!userId) return;

      await userModel.findByIdAndUpdate(userId, {
        isOnline: false,
      });
    });
  });
}

// 🔥 NEW: emit by room, not socketId
function emitToUser(userId, event, data) {
  if (!io) return;
  io.to(userId).emit(event, data);
}

module.exports = {
  initializeSocket,
  emitToUser
};
