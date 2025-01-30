import { match } from "assert";
import mongoose, { Schema, Document } from "mongoose";
import { unique } from "next/dist/build/utils";

export interface Message extends Document {
  conetent: string;
  CreatedAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  conetent: {
    type: String,
    required: true,
  },
  CreatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  message: Message[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
      "please use a valid email",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  verifyCode: {
    type: String,
    required: [true, "verification code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "verification code expiry date is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },
  message: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
