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

const router = express.Router();

router.get("/", getServicesData);
router.post("/add-service", addServicesData);
router.put("/edit-service/:id", editServiceData);
router.get("/service-content/:id", getServiceContentById);
router.post("/:id/add-service-content", addServiceContent);
router.put("/edit-service-content/:id", editServiceContent);
router.delete("/:serviceId/delete-service-content/:id", deleteServiceContent);

export default router;
