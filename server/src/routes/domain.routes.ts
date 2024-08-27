import express from 'express';
import {
  createDomain,
  getAllDomains,
//   getDomainById,
  updateDomain,
  deleteDomain,
  placeBid,
//   getDomainBids
} from '../controllers/domain.controller';

const router = express.Router();

// Create a new domain auction listing
router.post('/', createDomain);

// Get all domain auction listings
router.get('/', getAllDomains);

// Get a specific domain auction listing by ID
// router.get('/:domainId', getDomainById);

// Update an existing domain auction listing
router.put('/:domainId', updateDomain);

// Delete a domain auction listing
router.delete('/:domainId', deleteDomain);

// Place a bid on a domain auction
router.post('/:domainId/bid', placeBid);

// Get all bids for a specific domain
// router.get('/:domainId/bids', getDomainBids);

export default router;
