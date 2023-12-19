import express from "express";
import {
  addCarToRates,
  addRatesContent,
  addRatesData,
  deleteRatesContent,
  editRatesContent,
  editRatesData,
  getRatesData,
  removeCarsFromRates,
} from "../controllers/rates_ctrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getRatesData);
router.post("/add-rates", auth, addRatesData);
router.put("/edit-rate/:id", auth, editRatesData);
router.post("/:id/add-rate-content", auth, addRatesContent);
router.put("/edit-rate-content/:id", auth, editRatesContent);
router.delete("/:rateId/delete-rate-content/:id", auth, deleteRatesContent);
router.put("/add-cars", auth, addCarToRates);
router.put("/remove-cars", auth, removeCarsFromRates);

export default router;
