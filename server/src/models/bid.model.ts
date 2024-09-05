import mongoose, { Document, Schema } from 'mongoose';

export interface IBid extends Document {
  domainId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  auctionId: mongoose.Schema.Types.ObjectId;
  amount: number;
  createdAt: Date;
}

const BidSchema: Schema = new Schema({
  auctionId: { type: Schema.Types.ObjectId, ref: 'Auction', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IBid>('Bid', BidSchema);
