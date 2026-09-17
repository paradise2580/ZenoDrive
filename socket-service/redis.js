const { createClient } = require('redis');

const pubClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: true,
    rejectUnauthorized: false
  }
});

const subClient = pubClient.duplicate();

async function connectRedis() {
  await pubClient.connect();
  await subClient.connect();
  console.log('Redis connected');
}

module.exports = {
  pubClient,
  subClient,
  connectRedis
};
