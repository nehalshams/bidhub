import { Request, Response } from "express";
import Auction from "../models/auction.model";
import Bid from "../models/bid.model";
import Winner from "../models/winner.model";

// Create a new domain auction listing (Admin only)
export const createAuction = async (req: Request, res: Response) => {
  const { domainName, description, startingPrice, auctionEndTime } = req.body;

  try {
    const newAuction = await Auction.create({
      domainName,
      description,
      startingPrice,
      auctionEndTime,
    });
    res.status(201).json({ ...newAuction, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update an existing domain auction listing (Admin only)
export const updateAuction = async (req: Request, res: Response) => {
  const { auctionId } = req.params;
  const { name, description, startingPrice, auctionEndTime } = req.body;

  try {
    const updateAuction = await Auction.findByIdAndUpdate(
      auctionId,
      { name, description, startingPrice, auctionEndTime },
      { new: true }
    );
    if (!updateAuction) {
      return res.status(404).json({ message: "Auction not found" });
    }
    res.json(updateAuction);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a domain auction listing (Admin only)
export const deleteAuction = async (req: Request, res: Response) => {
  const { domainId } = req.params;

  try {
    const deleteAuction = await Auction.findByIdAndDelete(domainId);
    if (!deleteAuction) {
      return res.status(404).json({ message: "Auction not found" });
    }
    res.json({ message: "Auction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get details of a specific domain auction listing
export const getDomain = async (req: Request, res: Response) => {
  const { domainId } = req.params;

  try {
    const domain = await Auction.findById(domainId);
    if (!domain) {
      return res.status(404).json({ message: "Domain not found" });
    }
    res.json(domain);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all domain auction listings
export const getAllAuctions = async (req: Request, res: Response) => {
  const { name = "" } = req.query
  if (typeof name !== 'string') {
    return res.status(400).json({ message: 'Invalid query parameter' });
  }
  try {
    const auctions = await Auction.aggregate([
      {
        $match: {
          domainName: new RegExp(name, 'i') // Case-insensitive search
        }
      },
      {
        $lookup: {
          from: 'bids',
          localField: '_id',
          foreignField: 'auctionId',
          as: 'bids'
        }
      },
      {
        $unwind: {
          path: '$bids',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: {
          'bids.createdAt': -1
        }
      },
      {
        $group: {
          _id: '$_id',
          domainName: { $first: '$domainName' },
          startDate: { $first: '$startDate' },
          endDate: { $first: '$endDate' },
          latestBid: { $first: '$bids' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'latestBid.userId',
          foreignField: '_id',
          as: 'latestBid.user'
        }
      },
      {
        $unwind: {
          path: '$latestBid.user',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          domainName: 1,
          startDate: 1,
          endDate: 1,
          latestBid: {
            amount: 1,
            createdAt: 1,
            'user.email': 1
          }
        }
      }
    ]);

    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Place a bid on a domain auction listing
export const placeBid = async (req: Request, res: Response) => {
  const { auctionId } = req.params;
  const { userId, amount } = req.body;

  try {
    // Find the domain
    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ message: "Domain not found" });
    }

    // Check if the bid amount is higher than the current price
    if (amount <= (auction.currentPrice || auction.startingPrice)) {
      return res
        .status(400)
        .json({
          message: "Bid amount must be higher than the current price",
          success: false,
        });
    }

    // Create a new bid
    const newBid = await Bid.create({ auctionId, userId, amount });

    // Update the domain's current price
    auction.currentPrice = amount;
    await auction.save();

    res.status(201).json(newBid);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Admin selects the winner for a domain auction listing
export const selectWinner = async (req: Request, res: Response) => {
  const { domainId } = req.params;

  try {
    // Find the domain
    const domain = await Auction.findById(domainId);
    if (!domain) {
      return res.status(404).json({ message: "Auction not found" });
    }

    // Find the highest bid
    const highestBid = await Bid.findOne({ domainId }).sort({ amount: -1 });
    if (!highestBid) {
      return res.status(404).json({ message: "No bids found for this domain" });
    }

    // Create a winner record
    const winner = await Winner.create({
      domainId,
      userId: highestBid.userId,
      bidAmount: highestBid.amount,
      selectedAt: new Date(),
    });

    // Update domain status
    domain.status = "closed";
    await domain.save();

    res.json(winner);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllBid = async (req: Request, res: Response) => {
  const { auctionId } = req.params;
  try {
    const bids = await Bid.find({ auctionId: auctionId })
      .populate("userId")
      .populate("auctionId")
      .sort({ createdAt: -1 });
    if (!bids.length) {
      return res
        .status(404)
        .json({ message: "No bids found for this domain auction" });
    }

    const bidsWithUserField = bids.map((bid) => {
      const { userId, ...rest } = bid.toObject();
      return { ...rest, user: userId };
    });

    res.status(200).json({ data: bidsWithUserField });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
