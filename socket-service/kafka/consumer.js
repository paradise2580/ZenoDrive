const { Kafka } = require('kafkajs');
const { emitToUser } = require('../socket');

const kafka = new Kafka({
  clientId: 'socket-service',
  brokers: [process.env.KAFKA_BROKER],
  ssl: true,
  sasl: {
    mechanism: 'plain',
    username: process.env.KAFKA_API_KEY,
    password: process.env.KAFKA_API_SECRET,
  },
});

const consumer = kafka.consumer({ groupId: 'socket-consumers' });

async function startKafkaConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'ride.created' });
  await consumer.subscribe({ topic: 'ride.confirmed' });
  await consumer.subscribe({ topic: 'ride.started' });
  await consumer.subscribe({ topic: 'ride.ended' });
  await consumer.subscribe({ topic: 'ride.on_sight' });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const payload = JSON.parse(message.value.toString());

      const targetId = payload.userId || payload.captainId;

      if (!targetId) {
        console.warn('No targetId in payload', payload);
        return;
      }

      emitToUser(targetId, payload.event, payload.data);
    }
  });

  console.log('Kafka consumer running');
}

module.exports = { startKafkaConsumer };
