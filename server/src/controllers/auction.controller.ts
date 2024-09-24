import { Request, Response } from "express";
import Auction from "../models/auction.model";
import Bid from "../models/bid.model";
import Winner from "../models/winner.model";
import User from "../models/user.model";

// Create a new domain auction listing (Admin only)
export const createAuction = async (req: Request, res: Response) => {
  const { domainName, description, startingPrice, auctionEndTime, userId } = req.body;

  try {
    const newAuction = await Auction.create({
      domainName,
      description,
      startingPrice,
      auctionEndTime,
      createdBy: userId,
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
  const { auctionId } = req.params;

  try {
    const deleteAuction = await Auction.findByIdAndDelete(auctionId);
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
// export const getAllAuctions = async (req: Request, res: Response) => {
//   const { name = "", userId } = req.query;

//   if (typeof name !== "string") {
//     return res.status(400).json({ message: "Invalid query parameter" });
//   }
//   try {

//     // Model.aggregate( pipeline, options, callback );
//     const auctions = await Auction.aggregate([
//       {
//         $match: {
//           domainName: new RegExp(name, "i"), // Case-insensitive search
//         },
//       },
//       {
//         $lookup: {
//           from: "bids",
//           localField: "_id",
//           foreignField: "auctionId",
//           as: "bids",
//         },
//       },
//       {
//         $addFields: {
//           totalBids: { $size: "$bids" }, // Count total number of bids for each auction
//         },
//       },
//       {
//         $unwind: {
//           path: "$bids",
//           preserveNullAndEmptyArrays: true,
//         },
//       },
//       {
//         $sort: {
//           "bids.createdAt": -1,
//         },
//       },
//       {
//         $group: {
//           _id: "$_id",
//           domainName: { $first: "$domainName" },
//           startDate: { $first: "$startDate" },
//           auctionEndTime: { $first: "$auctionEndTime" },
//           latestBid: { $first: "$bids" },
//           totalBids: { $first: "$totalBids" }, 
//           startingPrice: { $first: "$startingPrice" }
//         },
//       },
//       {
//         $lookup: {
//           from: "users",
//           localField: "latestBid.userId",
//           foreignField: "_id",
//           as: "latestBid.user",
//         },
//       },
//       {
//         $unwind: {
//           path: "$latestBid.user",
//           preserveNullAndEmptyArrays: true,
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           domainName: 1,
//           startDate: 1,
//           auctionEndTime: 1,
//           startingPrice: 1,
//           totalBids: 1, // Include the totalBids in the response
//           latestBid: {
//             amount: 1,
//             createdAt: 1,
//             "user.email": 1,
//           },
//         },
//       },
//     ]);

//     // Get the user's bookmarks
//     const user = userId ? await User.findById(userId).select('bookmarks') : null;
//     const userBookmarks = user ? user.bookmarks.map(String) : []; // Convert ObjectIds to strings

//     // Manually add isBookmarked field
//     const auctionList = !user ? auctions : auctions.map(auction => ({
//       ...auction,
//       isBookmarked: userBookmarks.includes(auction._id.toString()), // Check if auction is bookmarked
//     }));

//     return res.status(200).json(auctionList);
//   } catch (error) {
//     if (!res.headersSent) {
//       return res.status(500).json({ message: "Server error" });
//     }
//   }
// };

export const getAllAuctions = async (req: Request, res: Response) => {
  const { userId, name } = req.query as { userId: string, name: string}; // Assuming userId is passed in the request body to check for bookmarks

  try {
    // Create a search filter based on the domainName if provided
    const searchFilter = name
    ? { domainName: new RegExp(name, "i") } // Case-insensitive search by domainName
    : {};

    // Step 1: Get all auctions with bid history
    const auctions = await Auction.find(searchFilter)
      .populate({
        path: 'bidHistory',
        options: { sort: { createdAt: -1 } }, // Get the latest bid
        populate: {
          path: 'userId', // Populate user data for the latest bid
          select: 'name email', // Fetch only name and email of the user
        },
      })
      .lean();

    // Step 2: Check if auctions are bookmarked by the current user
    const user = await User.findById(userId).select('bookmarks');
    const userBookmarks = user ? user.bookmarks.map(String) : [];

    // Step 3: Add isBookmarked, total number of bids, and latest bid information to each auction
    const auctionList = auctions.map((auction) => ({
      ...auction,
      isBookmarked: userBookmarks.includes(auction._id.toString()),
      totalBids: auction?.bidHistory?.length, // Count total bids from bidHistory
      latestBid: auction?.bidHistory?.[0] || null, // Get the latest bid
    }));

    // Step 4: Send response
    res.status(200).json(auctionList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Place a bid on a domain auction listing
// export const placeBid = async (req: Request, res: Response) => {
//   const { auctionId } = req.params;
//   const { userId, amount } = req.body;

//   try {
//     // Find the domain
//     const auction = await Auction.findById(auctionId);
//     if (!auction) {
//       return res.status(404).json({ message: "Domain not found" });
//     }

//     // Check if the bid amount is higher than the current price
//     if (amount <= (auction.currentPrice || auction.startingPrice)) {
//       return res.status(400).json({
//         message: "Bid amount must be higher than the current price",
//         success: false,
//       });
//     }

//     // Create a new bid
//     const newBid = await Bid.create({ auctionId, userId, amount });
//     // Update the domain's current price
//     auction.currentPrice = amount;
//     await auction.save();
//     // Update the auction's bidHistory to include the new bid
//     await Auction.findByIdAndUpdate(auctionId, {
//       $push: { bidHistory: newBid._id },
//       $set: { currentPrice: amount }, // Optionally, update current price with latest bid
//     });

//     res.status(201).json(newBid);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };


export const placeBid = async (req: Request, res: Response) => {
  const { auctionId, userId, amount } = req.body;

  try {
    // Step 1: Check if the auction is active
    const auction = await Auction.findById(auctionId);

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    if (auction.status !== 'active') {
      return res.status(400).json({ message: 'Auction is closed or inactive' });
    }

    // Step 2: Create the new bid
    const newBid = await Bid.create({
      auctionId,
      userId,
      amount,
    });
    console.log("🚀 ~ placeBid ~ newBid:", newBid)

    // Step 3: Update the Auction document with the latest bid details
    auction.currentPrice = amount; // Update the current price to the latest bid amount
    auction?.bidHistory?.push(newBid._id); // Add the bid to the bid history

    console.log("🚀 ~ placeBid ~ auction:", auction)
    await auction.save();

    res.status(201).json({
      message: 'Bid placed successfully',
      bid: newBid,
      auction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
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
  const { auctionId = "" } = req.params;
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

export const getAuctionDetails = async (req: Request, res: Response) => {
  const { auctionId } = req.params;

  try {
    const auctionDetail = await Auction.findById(auctionId).populate({
      path: "bidHistory",
      populate: { path: "userId", select: 'email firstName lastName' },
    });
    res.status(200).json({ data: auctionDetail });
  } catch (error) { }
};

export const getAuctionByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const auctions = await Auction.find({ createdBy: userId });
    // if (!auctions.length) {
    //   return res.status(404).json({ message: "You don't created any auction" })
    // }

    return res.status(200).json(auctions)
  } catch (err) {
    console.log(err)
    return res.status(400).json({ message: 'Server error' })
  }
}


export const selectAuctionWinner = async (req: Request, res: Response) => {
  const { auctionId, winnerId, userId } = req.body;

  try {
    // Step 1: Find the auction
    const auction = await Auction.findById(auctionId);

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }
    // Step 2: Ensure that the current user is the creator of the auction
    if (auction?.createdBy?.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to select a winner for this auction' });
    }

    // // Step 3: Find the bid and ensure it belongs to the auction
    // const bid = await Bid.findById(bidId);
    // if (!bid || bid.auctionId.toString() !== auctionId) {
    //   return res.status(404).json({ message: 'Bid not found or does not belong to this auction' });
    // }

    // Step 4: Mark the auction as closed and set the winner
    auction.status = 'closed';
    auction.winner = winnerId; // Set the user who placed the bid as the winner
    await auction.save();

    res.status(200).json({
      message: 'Auction closed and winner selected successfully',
      auction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAuctionsWithUserBids = async (req: Request, res: Response) => {
  const { userId } = req.query; // Assuming userId is passed in the query

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  return res.status(200).json({ message: 'done'})

  try {
    // Step 1: Aggregate bids made by the user, and get auction details
    const auctions = await Bid.aggregate([
      {
        $match: { userId }, // Match bids placed by the user
      },
      {
        $group: { // Group by auctionId to get unique auctions
          _id: "$auctionId",
          latestUserBid: { $last: "$amount" }, // Get the latest bid amount from the user
          bidTime: { $last: "$createdAt" }, // Get the latest bid time
          totalBids: { $sum: 1 }, // Count the total number of bids placed
        },
      },
      {
        $lookup: { // Lookup the auction details
          from: 'auctions',
          localField: '_id',
          foreignField: '_id',
          as: 'auction',
        },
      },
      {
        $unwind: "$auction", // Unwind the auction array
      },
      {
        $project: { // Only return required fields
          _id: 0,
          auctionId: "$_id",
          domainName: "$auction.domainName",
          description: "$auction.description",
          startingPrice: "$auction.startingPrice",
          currentPrice: "$auction.currentPrice",
          status: "$auction.status",
          auctionEndTime: "$auction.auctionEndTime",
          createdAt: "$auction.createdAt",
          updatedAt: "$auction.updatedAt",
          createdBy: "$auction.createdBy",
          latestUserBid: 1,
          bidTime: 1,
          totalBids: 1,
        }
      }
    ]);

    if (auctions.length === 0) {
      return res.status(404).json({ message: 'No bids found for this user' });
    }

    // Step 2: Send the auction list
    res.status(200).json(auctions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
