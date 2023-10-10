import mongoose from "mongoose";



const carRateSchema = new mongoose.Schema({
    daily: String,
    weekly: String,
    monthly: String,
});




export const carRateModel = mongoose.model('CarRate', carRateSchema);