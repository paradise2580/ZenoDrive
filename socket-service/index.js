require('dotenv').config();
const express = require('express');
const http = require('http');
const { initializeSocket } = require('./socket');
const { startKafkaConsumer } = require('./kafka/consumer');
const connectToDb = require('./db/db');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

// Health check
app.get('/health', (_, res) => res.send('OK'));

(async () => {
  try {
    // 🔑 CONNECT TO DB FIRST
    await connectToDb();

    initializeSocket(server);
    await startKafkaConsumer();

    server.listen(PORT, () => {
      console.log(`Socket service running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Socket service failed to start', err);
    process.exit(1);
  }
})();
