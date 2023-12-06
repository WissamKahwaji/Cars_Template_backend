import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  pageHeading: String,
  pageHeadingAr: String,
  descHeading: String,
  descHeadingAr: String,

  content: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "serviceContent",
    },
  ],
});

export const serviceModel = mongoose.model("services", serviceSchema);
