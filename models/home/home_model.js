import mongoose from "mongoose";



const homeSchema = new mongoose.Schema({
    landingImg: String,
    brandName: String,
    brandDesc: String,
    logoImg: String,
    phoneNumber: String,
    mobileNumber: String,
    whatsApp: String,
    mailId: String,
    instagram: String,
    facebook: String,
    twitter: String,
    linkedIn: String,
    youtube: String,
    location: String,
});




export const homeModel = mongoose.model('home', homeSchema);