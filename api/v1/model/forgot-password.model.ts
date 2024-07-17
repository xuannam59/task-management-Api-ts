import mongoose from "mongoose";

const forgotSchema = new mongoose.Schema({
  email: String,
  otp: String,
  expireAt: {
    type: Date,
    expires: 0
  }
}, {
  timestamps: true,
});

const Forgot = mongoose.model("Forgot", forgotSchema, "forgot-password");

export default Forgot;