import mongoose from "mongoose";


const aboutContentSchema = new mongoose.Schema({
    img: String,
    mainTitle: String,
    secTitle: String,
    desc: String,
});



export const aboutContentModel = mongoose.model('aboutContentModel', aboutContentSchema);