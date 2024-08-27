import mongoose, { Document, Schema } from 'mongoose';

export interface IWinner extends Document {
  domainId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  bidAmount: number;
  selectedAt: Date;
}

const WinnerSchema: Schema = new Schema({
  domainId: { type: Schema.Types.ObjectId, ref: 'Domain', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bidAmount: { type: Number, required: true },
  selectedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IWinner>('Winner', WinnerSchema);
