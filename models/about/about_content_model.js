import mongoose from "mongoose";

const aboutContentSchema = new mongoose.Schema({
  img: String,
  mainTitle: String,
  secTitle: String,
  secTitleAr: String,
  desc: String,
  descAr: String,
});

export const aboutContentModel = mongoose.model(
  "aboutContentModel",
  aboutContentSchema
);
