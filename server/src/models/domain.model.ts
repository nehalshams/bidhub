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

const DomainSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  startingPrice: { type: Number, required: true },
  currentPrice: { type: Number },
  status: { type: String, enum: ['active', 'closed'], default: 'active' },
  auctionEndTime: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IDomain>('Domain', DomainSchema);
