import mongoose, { Document, ObjectId, Schema, SchemaType } from 'mongoose';

export interface IAuction extends Document {
  _id: string,
  domainName: string;
  description: string;
  startingPrice: number;
  currentPrice?: number;
  status: 'active' | 'closed';
  auctionEndTime: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  winner?: ObjectId; 
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
  bidHistory: [{ type: Schema.Types.ObjectId, ref: 'Bid'}],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  winner: { type: Schema.Types.ObjectId, ref: 'User' } // Store the winner of the auction
});

// Adding virtual field for isBookmarked
AuctionSchema.virtual('isBookmarked').get(function (this: IAuction, userBookmarks: string[]): boolean {
  // Check if this auction's _id exists in the user's bookmarks
  return userBookmarks?.includes(this._id.toString());
});


AuctionSchema.set('toObject', { virtuals: true });
AuctionSchema.set('toJSON', { virtuals: true });

const Auction = mongoose.model<IAuction>('Auction', AuctionSchema);
export default Auction; 
