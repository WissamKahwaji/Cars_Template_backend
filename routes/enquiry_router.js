import express from "express";
import {
  addEnquiryForm,
  getEnquiryData,
  getUserInquiryData,
} from "../controllers/enquiry_ctrl.js";

const router = express.Router();

router.get("/", getEnquiryData);
router.post("/form", addEnquiryForm);
router.get("/user-inquiries", getUserInquiryData);
export default router;
