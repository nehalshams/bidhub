import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import Auction from '../models/auction.model'
import crypto from 'crypto';
import nodemailer from 'nodemailer'

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


export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User with this email does not exist" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash the token and store it in the user record along with an expiration time
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // Token expires in 30 minutes

    await user.save();

    // Create the reset link with token
    const resetUrl = `${req.protocol}://${req.get('host')}/sign-in/reset-password?token=${resetToken}`;

    // Send an email (this is a simple example using nodemailer)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS  // Make sure you use App Passwords if you have 2FA enabled
      }
    });
    
    // Email options
    const mailOptions = {
      from: "dev.nshams@gmail.com",  // Sender address
      to: email,  // Recipient's address
      subject: 'Reset password',  // Subject
      text: 'Hello from Bidhub!', // Plain text body
      html: `<h1>Hello</h1><p>Click on this link to reset your password <br> <a href=${resetUrl} target="_blank"></a></p>`  // HTML body
    };
    
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error occurred: ' + error.message);
        return process.exit(1);
      }
    });
    res.status(200).json({ message: "Reset link sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.query; // Token from the reset link
  const { password } = req.body; // New password

  try {
    // Hash the token again to compare it with the one in the database
    const hashedToken = crypto.createHash('sha256').update(token as string).digest('hex');

    // Find the user by the reset token and make sure it hasn't expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }, // Ensure token is not expired
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Update the user's password and remove the reset token fields
    user.password = password; // Make sure to hash the password before saving
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

