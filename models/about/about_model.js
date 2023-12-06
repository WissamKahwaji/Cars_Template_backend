import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  pageHeading: String,
  pageHeadingAr: String,

  descHeading: String,
  descHeadingAr: String,
  content: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "aboutContentModel",
    },
  ],
  secondeTitle: String,
  secondTitleAr: String,
  secondSectionImgs: [String],
});

export const aboutModel = mongoose.model("about", aboutSchema);
