import mongoose from "mongoose";


const carSchema = new mongoose.Schema({
    img: String,
    title: String,
    desc: String,
    imgs: [String],
});



export const carModel = mongoose.model('Car', carSchema);