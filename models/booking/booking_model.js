import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  fullName: String,
  mobile: String,
  email: String,
  pickUpDate: String,
  dropOffDate: String,
  from: String,
  to: String,
  reservationDate: Date,
});

export const bookingModel = mongoose.model("Booking", bookingSchema);
