import express from 'express';
import { registerUser, loginUser } from '../controllers/user.controller';
import { validateUser } from '../middlewares/auth.middleware'

const router = express.Router();

// Register new user
router.post('/signup', validateUser, registerUser);

// Login user
router.post('/login', loginUser);

export default router;
