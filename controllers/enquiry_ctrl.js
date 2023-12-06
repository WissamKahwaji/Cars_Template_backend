import { enquiryModel } from "../models/enquiry/enquiry_model.js";
import nodemailer from "nodemailer";
import { userEnquiryModel } from "../models/enquiry/user_enquiry_model.js";

export const getEnquiryData = async (req, res) => {
  try {
    const enquiries = await enquiryModel.findOne();
    return res.status(200).json({
      message: "Success",
      data: enquiries,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const addEnquiryForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      port: 465, // true for 465, false for other ports
      host: "smtp.gmail.com",
      auth: {
        user: "Netzoon.2023@gmail.com",
        pass: "gncp ypax rnfm apxh",
      },
      secure: true,
    });
    const mailOptions = {
      from: email,
      to: "netzoon.2023@gmail.com",
      subject: "New Enquiry",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };
    const newUserEnquiry = new userEnquiryModel({
      name,
      email,
      message,
    });
    await newUserEnquiry.save();
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send("Enquiry submitted successfully");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
