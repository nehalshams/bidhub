import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import Auction from '../models/auction.model'

// Register a new user
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, firstName, lastName, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({ email, password: hashedPassword, firstName, lastName, role });

    res.status(201).json({ message: 'User registered successfully', data: newUser, userId: newUser._id });
  } catch (error) {
    next(error); // Pass any caught error to the error handling middleware
  }
};

// Login a user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addBookmark = async (req: Request, res: Response, next: NextFunction) => {
  const { userId = "", auctionId = "" } = req.body as { userId: string, auctionId: string}

  try {
    const auction = await Auction.findById(auctionId);

    if (!auction) {
      res.status(404).json({ message: 'Auction not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the auction is already bookmarked
    if (user.bookmarks.includes(auctionId)) {
      return res.status(400).json({ message: 'Auction is already bookmarked' });
    }

    // Add the auction to the user's bookmarks
    user.bookmarks.push(auctionId);
    await user.save();

    res.status(200).json({ message: 'Auction bookmarked successfully', bookmarks: user.bookmarks });
  } catch (err) {
    next(err)
  }
}

export const deleteBookmark = async (req: Request, res: Response) => {
  const { auctionId } = req.params; // Get auctionId from the URL params
  const { userId } = req.body; // Assuming req.body contains the authenticated user's ID

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the auctionId exists in the user's bookmarks
    if (!user.bookmarks.includes(auctionId)) {
      return res.status(400).json({ message: "Auction not bookmarked by the user" });
    }

    // Remove the auctionId from the user's bookmarks
    await User.findByIdAndUpdate(userId, {
      $pull: { bookmarks: auctionId }
    });

    res.status(200).json({ message: "Bookmark removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
