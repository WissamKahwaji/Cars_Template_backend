import express from "express";
import { addEnquiryForm, getEnquiryData } from "../controllers/enquiry_ctrl.js";

const router = express.Router();

router.get("/", getEnquiryData);
router.post("/form", addEnquiryForm);

export default router;
