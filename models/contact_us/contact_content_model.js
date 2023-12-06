import mongoose from "mongoose";

const contactContentSchema = new mongoose.Schema({
  titleOne: String,
  titleOneAr: String,

  titleTwo: String,
  titleTwoAr: String,

  phoneNumber: String,
  location: String,
  email: String,
  emailOne: String,
  emailTwo: String,
  mobileOne: String,
  mobileTwo: String,
  whatsApp: String,
  faceBook: String,
  linkedIn: String,
  instagram: String,
});

export const contactContentModel = mongoose.model(
  "contactContent",
  contactContentSchema
);
