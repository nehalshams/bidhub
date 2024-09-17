import express from 'express';
import { registerUser, loginUser, addBookmark, deleteBookmark } from '../controllers/user.controller';
import { validateUser } from '../middlewares/auth.middleware'

const router = express.Router();

// Register new user
router.post('/signup', validateUser, registerUser);

// Login user
router.post('/login', loginUser);

router.post('/bookmark', addBookmark)

router.delete('/bookmark/:auctionId', deleteBookmark)

export default router;
