import express from "express";
import {
  addServiceContent,
  addServicesData,
  deleteServiceContent,
  editServiceContent,
  editServiceData,
  getServiceContentById,
  getServicesData,
} from "../controllers/services_ctrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getServicesData);
router.post("/add-service", auth, addServicesData);
router.put("/edit-service/:id", auth, editServiceData);
router.get("/service-content/:id", getServiceContentById);
router.post("/:id/add-service-content", auth, addServiceContent);
router.put("/edit-service-content/:id", auth, editServiceContent);
router.delete(
  "/:serviceId/delete-service-content/:id",
  auth,
  deleteServiceContent
);

export default router;
