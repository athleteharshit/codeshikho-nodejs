import { Schema, model } from "mongoose";

export interface User {
  email: string;
  password: string;
  username: string;
  created_at: Date;
  updated_at: Date;
  verified: boolean;
  verification_token: number;
  verification_token_time: any;
}

const userSchema = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
  verified: { type: Boolean, required: true, default: false },
  verification_token: { type: Number, required: true },
  verification_token_time: { type: Date, required: true },
});

export default model("user", userSchema);
