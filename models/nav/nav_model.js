import mongoose from "mongoose";


const navSchema = new mongoose.Schema({
    home: Boolean,
    about: Boolean,
    contactUs: Boolean,
    cars: Boolean,
    bookings: Boolean,
});



export const navModel = mongoose.model('Nav', navSchema);