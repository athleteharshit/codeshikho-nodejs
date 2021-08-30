import { Schema, model } from "mongoose";

export interface User {
  email: string;
  password: string;
  username: string;
  created_at: Date;
  updated_at: Date;
}

const userSchema = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
});

export default model("user", userSchema);
