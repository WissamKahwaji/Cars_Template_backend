import express from "express";
import {
  addAboutContent,
  addAboutData,
  addOrUpdateAnotherContent,
  deleteAboutContent,
  editAboutContent,
  editAboutData,
  getAboutContentById,
  getAboutData,
  getAnotherAboutData,
} from "../controllers/about_ctrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAboutData);
router.post("/add-about", auth, addAboutData);
router.put("/edit-about/:id", auth, editAboutData);
router.post("/add-about-content", auth, addAboutContent);
router.put("/edit-about-content/:id", auth, editAboutContent);
router.delete("/delete-about-content/:id", auth, deleteAboutContent);
router.get("/about-content/:id", getAboutContentById);
router.get("/another-about", getAnotherAboutData);
router.post("/add-or-update", auth, addOrUpdateAnotherContent);

export default router;
