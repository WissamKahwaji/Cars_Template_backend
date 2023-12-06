import mongoose from "mongoose";

const userEnquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

export const userEnquiryModel = mongoose.model(
  "UserEnquiry",
  userEnquirySchema
);
