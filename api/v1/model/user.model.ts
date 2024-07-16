import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  avatar: String,
  password: String,
  token: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deleteAt: Date,

}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema, "users");

export default User;