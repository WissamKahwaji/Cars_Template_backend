import mongoose from "mongoose";

const serviceContentSchema = new mongoose.Schema({
  img: String,
  title: String,
  titleAr: String,
  desc: String,
  descAr: String,
});

export const serviceContent = mongoose.model(
  "serviceContent",
  serviceContentSchema
);
