import express from "express";
import {
  addHomeData,
  editHomeData,
  getHomeData,
} from "../controllers/home_ctrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getHomeData);
router.post("/add-home-data", auth, addHomeData);
router.put("/edit-home-data/:id", auth, editHomeData);

export default router;
