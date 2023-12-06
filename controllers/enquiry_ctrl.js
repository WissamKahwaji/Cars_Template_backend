import { enquiryModel } from "../models/enquiry/enquiry_model.js";

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
    const { firstName, lastName, email, enquiryAbout, message } = req.body;
    return res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
