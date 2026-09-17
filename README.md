# ZenoRide - Ride Sharing Application

A full-stack ride-sharing application built with modern web technologies, featuring real-time location tracking, driver-passenger matching, and live ride updates.

## 📋 Project Structure

```
ZenoRideV2/
├── Backend/                 # Node.js/Express server
├── Frontend/               # React + Vite frontend
└── socket-service/         # WebSocket server for real-time features
```
## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (for Backend)
- Redis instance (for Socket Service)
- Kafka (for event streaming)

### Installation

#### 1. Backend Setup
```bash
cd Backend
npm install
# Configure .env file with your database and service credentials
node server.js
```

#### 2. Frontend Setup
```bash
cd Frontend
npm install
# Configure .env file with API endpoints
npm run dev
```

#### 3. Socket Service Setup
```bash
cd socket-service
npm install
# Configure .env file with Redis, Kafka, and database credentials
node index.js
```

## 🏗️ Architecture Overview

### Backend
Node.js and Express-based REST API server handling:
- User authentication and authorization
- Captain (driver) management
- Ride creation and management
- Maps integration for location services
- Kafka message producer for event streaming

**Key Components:**
- `controllers/` - Request handlers for different routes
- `models/` - Database schemas and models
- `services/` - Business logic layer
- `routes/` - API endpoints
- `middlewares/` - Authentication and other middleware
- `kafka/` - Event publishing
- `db/` - Database configuration

### Frontend
React application with Vite build tool for:
- User and captain authentication
- Real-time ride booking interface
- Live location tracking
- Ride confirmation and management

**Key Components:**
- `components/` - Reusable UI components
- `pages/` - Page components for different views
- `context/` - React context for state management (User, Captain, Socket)
- `assets/` - Static assets and images

### Socket Service
Real-time communication service featuring:
- Redis for caching and pub/sub
- Kafka consumer for event consumption
- WebSocket server for live updates
- Captain and user socket models for connection management

**Key Components:**
- `socket.js` - WebSocket server setup
- `redis.js` - Redis connection and operations
- `kafka/` - Kafka consumer for events
- `models/` - Socket models for tracking connections

## 🔧 Environment Configuration

Create `.env` files in each folder with required variables:

**Backend/.env**
- Database connection strings
- JWT secrets
- Maps API keys
- Kafka broker URLs

**Frontend/.env**
- Backend API URL
- Socket service URL

**socket-service/.env**
- Redis connection URL
- Kafka broker URLs
- Database connection strings

## 🎯 Key Features

- **User Authentication**: Secure login/signup for users and captains
- **Ride Booking**: Real-time ride request and acceptance
- **Live Tracking**: Real-time location updates during rides
- **Driver Matching**: Intelligent driver assignment
- **Ride Management**: Track active rides and ride history
- **Location Services**: Integration with maps API
- **Event Streaming**: Kafka-based event processing for real-time features

## 📡 Technology Stack

**Backend:**
- Node.js
- Express.js
- MongoDB
- Kafka
- JWT Authentication

**Frontend:**
- React
- Vite
- Tailwind CSS
- Socket.io (for real-time updates)

**Socket Service:**
- Node.js
- Redis
- Kafka
- WebSocket

## 🔄 Deployment

Each service includes a `vercel.json` configuration for deployment on Vercel. The `docker-compose.yml` in socket-service can be used for containerized deployment.

## 📝 API Endpoints

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout

### Captains
- `POST /api/captains/register` - Register new captain
- `POST /api/captains/login` - Captain login
- `POST /api/captains/logout` - Captain logout

### Rides
- `POST /api/rides/request` - Request a ride
- `GET /api/rides/:id` - Get ride details
- `POST /api/rides/:id/confirm` - Confirm ride
- `POST /api/rides/:id/finish` - Finish ride

### Maps
- `GET /api/maps/coordinates` - Get location coordinates
- `GET /api/maps/distance` - Calculate distance between locations

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is private and proprietary.

---

**Last Updated:** February 2026
