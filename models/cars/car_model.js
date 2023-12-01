import mongoose from "mongoose";


const carSchema = new mongoose.Schema({
    img: String,
    title: String,
    desc: String,
    imgs: [String],
    rates_description: String,
    carRate: [{
        title: String,
        price: String,
    }]
});



export const carModel = mongoose.model('Car', carSchema);