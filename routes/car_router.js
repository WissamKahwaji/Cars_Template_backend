import express from "express";
import {
  addCarPageData,
  addCarRate,
  addCarToCategoryOne,
  addCarToCategoryThree,
  addCarToCategoryTwo,
  deleteCar,
  deleteCarRate,
  editCar,
  editCarPageData,
  editCarRate,
  getCarById,
  getCarPageData,
  getCarRate,
} from "../controllers/car_ctrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getCarPageData);
router.post("/add-carPage", auth, addCarPageData);
router.put("/edit-carPage/:id", auth, editCarPageData);
router.get("/get-car-by-id/:id", getCarById);
router.post("/:id/add-car-to-cat-one", auth, addCarToCategoryOne);
router.post("/:id/add-car-to-cat-two", auth, addCarToCategoryTwo);
router.post("/:id/add-car-to-cat-three", auth, addCarToCategoryThree);
router.put("/edit-car/:id", auth, editCar);
router.delete("/:carPageId/delete-car/:id", auth, deleteCar);
router.get("/get-car-rate/:id", getCarRate);
router.post("/:carId/add-car-rate/", auth, addCarRate);
router.put("/:carId/edit-car-rate/", auth, editCarRate);
router.delete("/:carId/delete-car-rate/:carRateId", auth, deleteCarRate);
export default router;
