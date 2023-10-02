import mongoose from "mongoose";


const serviceContentSchema = new mongoose.Schema({
    img: String,
    title: String,
    desc: String,
});



export const serviceContent = mongoose.model('serviceContent', serviceContentSchema);