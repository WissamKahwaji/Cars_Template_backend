import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  title: String,
  titleAr: String,
  subTitle: String,
  subTitleAr: String,
  img: String,
});

export const enquiryModel = mongoose.model("Enquiry", enquirySchema);
