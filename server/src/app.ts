import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import auctionRoutes from './routes/auction.routes';
import connectDB from './config/db';
import { errorHandler } from './middlewares/errorHandler.middleware';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app: Application = express();


const allowedOrigins = ['http://localhost:3000', 'https://bidhub-five.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auctions', auctionRoutes);

app.use(errorHandler);

export default app;
