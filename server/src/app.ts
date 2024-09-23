import express, { Application } from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import auctionRoutes from './routes/auction.routes';
import connectDB from './config/db';
import { errorHandler } from './middlewares/errorHandler.middleware';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app: Application = express();

// Define allowed origins
const allowedOrigins = ['https://bidhub-five.vercel.app', 'http://localhost:3000',  'http://localhost:3001'];

// Define CORS options with proper types
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  };  

app.use(cors(corsOptions));

app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auctions', auctionRoutes);

app.use(errorHandler);

export default app;
