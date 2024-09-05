import mongoose, { Document, Schema } from 'mongoose';

export interface IDomain extends Document {
  name: string;
  description: string;
  startingPrice: number;
  currentPrice?: number;
  status: 'active' | 'closed';
  auctionEndTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AuctionSchema: Schema = new Schema({
  domainName: { type: String, required: true },
  description: { type: String },
  startingPrice: { type: Number, required: true },
  currentPrice: { type: Number },
  status: { type: String, enum: ['active', 'closed'], default: 'active' },
  auctionEndTime: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  bidHistory: [{ type: Schema.Types.ObjectId, ref: 'Bid'}]
});

export default mongoose.model<IDomain>('Auction', AuctionSchema);
