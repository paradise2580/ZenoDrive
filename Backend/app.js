const express = require('express')
const app = express()
const path = require('path');
const dotenv = require('dotenv')
dotenv.config({ path: path.resolve(__dirname, '.env') });
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes')
const mapsRoutes = require('./routes/maps.routes')
const rideRoutes = require('./routes/ride.routes');
const { connectProducer } = require('./kafka/producer')



console.log('ENV CHECK:', {
  KAFKA_BROKER: process.env.KAFKA_BROKER,
  PORT: process.env.PORT
});


const connectToDb = require('./db/db')
connectToDb();

const allowedOrigins = [
  'https://zeno-ride-v2.vercel.app',
  'https://www.zenoride.in',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

connectProducer().catch(console.error);

// VERY IMPORTANT (preflight fix)
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded( {extended:true} ) )
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('hi');
});

app.get('/health', (_, res) => res.send('OK'));

app.use('/users', userRoutes)
app.use('/captains', captainRoutes)
app.use('/maps', mapsRoutes)
app.use('/rides', rideRoutes);

module.exports = app;

