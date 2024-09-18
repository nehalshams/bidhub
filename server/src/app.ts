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

app.use(cors());

app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auctions', auctionRoutes);

app.use(errorHandler);

export default app;
