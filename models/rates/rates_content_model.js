

import mongoose from "mongoose";


const ratesContentSchema = new mongoose.Schema({
    img: String,
    desc: String,
});



export const ratesContentModel = mongoose.model('ratesContent', ratesContentSchema);