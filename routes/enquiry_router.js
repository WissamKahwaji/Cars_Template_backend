import express from "express";
import {
  addEnquiryForm,
  getEnquiryData,
  getUserInquiryData,
} from "../controllers/enquiry_ctrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getEnquiryData);
router.post("/form", addEnquiryForm);
router.get("/user-enquiries", getUserInquiryData);
export default router;
