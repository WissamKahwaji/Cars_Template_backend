import express from "express";
import {
  addNavData,
  editNavData,
  getNavData,
} from "../controllers/nav_ctrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getNavData);
router.post("/add", auth, addNavData);
router.put("/edit/:id", auth, editNavData);

export default router;
