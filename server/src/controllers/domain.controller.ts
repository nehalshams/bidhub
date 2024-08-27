import { Request, Response } from 'express';
import Domain from '../models/domain.model';
import Bid from '../models/bid.model';
import User from '../models/user.model';
import Winner from '../models/winner.model';

// Create a new domain auction listing (Admin only)
export const createDomain = async (req: Request, res: Response) => {
  const { name, description, startingPrice, auctionEndTime } = req.body;

  try {
    const newDomain = await Domain.create({ name, description, startingPrice, auctionEndTime });
    res.status(201).json(newDomain);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an existing domain auction listing (Admin only)
export const updateDomain = async (req: Request, res: Response) => {
  const { domainId } = req.params;
  const { name, description, startingPrice, auctionEndTime } = req.body;

  try {
    const updatedDomain = await Domain.findByIdAndUpdate(domainId, { name, description, startingPrice, auctionEndTime }, { new: true });
    if (!updatedDomain) {
      return res.status(404).json({ message: 'Domain not found' });
    }
    res.json(updatedDomain);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a domain auction listing (Admin only)
export const deleteDomain = async (req: Request, res: Response) => {
  const { domainId } = req.params;

  try {
    const deletedDomain = await Domain.findByIdAndDelete(domainId);
    if (!deletedDomain) {
      return res.status(404).json({ message: 'Domain not found' });
    }
    res.json({ message: 'Domain deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get details of a specific domain auction listing
export const getDomain = async (req: Request, res: Response) => {
  const { domainId } = req.params;

  try {
    const domain = await Domain.findById(domainId);
    if (!domain) {
      return res.status(404).json({ message: 'Domain not found' });
    }
    res.json(domain);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all domain auction listings
export const getAllDomains = async (req: Request, res: Response) => {
  try {
    const domains = await Domain.find();
    res.json(domains);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Place a bid on a domain auction listing
export const placeBid = async (req: Request, res: Response) => {
  const { domainId } = req.params;
  const { userId, amount } = req.body;

  try {
    // Find the domain
    const domain = await Domain.findById(domainId);
    if (!domain) {
      return res.status(404).json({ message: 'Domain not found' });
    }

    // Check if the bid amount is higher than the current price
    if (amount <= (domain.currentPrice || domain.startingPrice)) {
      return res.status(400).json({ message: 'Bid amount must be higher than the current price' });
    }

    // Create a new bid
    const newBid = await Bid.create({ domainId, userId, amount });

    // Update the domain's current price
    domain.currentPrice = amount;
    await domain.save();

    res.status(201).json(newBid);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin selects the winner for a domain auction listing
export const selectWinner = async (req: Request, res: Response) => {
  const { domainId } = req.params;

  try {
    // Find the domain
    const domain = await Domain.findById(domainId);
    if (!domain) {
      return res.status(404).json({ message: 'Domain not found' });
    }

    // Find the highest bid
    const highestBid = await Bid.findOne({ domainId }).sort({ amount: -1 });
    if (!highestBid) {
      return res.status(404).json({ message: 'No bids found for this domain' });
    }

    // Create a winner record
    const winner = await Winner.create({
      domainId,
      userId: highestBid.userId,
      bidAmount: highestBid.amount,
      selectedAt: new Date()
    });

    // Update domain status
    domain.status = 'closed';
    await domain.save();

    res.json(winner);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
