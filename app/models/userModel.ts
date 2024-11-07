import mongoose, { Schema } from "mongoose";

export type User = {
  username: string;
  email: string;
  password: string;
  messages: {
    title: string;
    messages: {
      sender: string;
      text: string;
      time: string;
    }[];
  }[];
};

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username already exists"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;