

import mongoose from "mongoose";


const anotherAboutSchema = new mongoose.Schema({
    img: String,
    content: [String],
});


export const anotherAboutModel = mongoose.model('anotherAboutModel', anotherAboutSchema);