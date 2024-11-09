import mongoose, { Schema } from "mongoose";

export type User = {
  username: string;
  email: string;
  password: string;
  image: string;
};

const userSchema: Schema = new Schema({
  username: String,
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  image: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
