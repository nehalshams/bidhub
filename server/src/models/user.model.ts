import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  resetPasswordToken: string | undefined,
  resetPasswordExpire: number | undefined,
  password: string;
  role: "admin" | "user";
  bookmarks: string[],
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Auction' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
