import mongoose from "mongoose";

const ratesSchema = new mongoose.Schema({
  pageHeading: String,
  pageHeadingAr: String,
  imgHeading: String,
  content: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
  cancellationPolicy: String,
  cancellationPolicyAr: String,
  titleOne: String,
  titleOneAr: String,
  titleTwo: String,
  titleTwoAr: String,
  titleThree: String,
  titleThreeAr: String,
});

export const ratesModel = mongoose.model("rates", ratesSchema);
