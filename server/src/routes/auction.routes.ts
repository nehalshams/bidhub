import express from 'express';
import {
//   getDomainById,
  placeBid,
  createAuction,
  updateAuction,
  deleteAuction,
  getAllBid,
  getAllAuctions,
//   getDomainBids
} from '../controllers/auction.controller';

const router = express.Router();

// Create a new domain auction listing
router.post('/', createAuction);

// Get all domain auction listings
router.get('/', getAllAuctions);

// Get a specific domain auction listing by ID
// router.get('/:domainId', getDomainById);

// Update an existing domain auction listing
router.put('/:auctionId', updateAuction);

// Delete a domain auction listing
router.delete('/:auctionId', deleteAuction);

// Place a bid on a domain auction
router.post('/:auctionId/bid', placeBid);

// get all bid for the particular auction id
router.get('/:auctionId/bid', getAllBid)

// Get all bids for a specific domain
// router.get('/:domainId/bids', getDomainBids);

export default router;
