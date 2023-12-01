import mongoose from "mongoose";



const carRateSchema = new mongoose.Schema({
    title: String,
    price: String,
});




export const carRateModel = mongoose.model('CarRate', carRateSchema);