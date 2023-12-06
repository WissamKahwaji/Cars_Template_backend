import mongoose from "mongoose";

const carPageSchema = new mongoose.Schema({
  pageHeading: String,
  pageHeadingAr: String,
  descHeading: String,
  descHeadingAr: String,
  img: String,
  categoryOne: String,
  categoryOneAr: String,
  categoryTwo: String,
  categoryTwoAr: String,
  categoryThree: String,
  categoryThreeAr: String,
  categoryOneContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
  categoryTwoContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
  categoryThreeContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
  concellationPolicy: String,
  concellationPolicyAr: String,
});

export const carPageModel = mongoose.model("carPage", carPageSchema);
