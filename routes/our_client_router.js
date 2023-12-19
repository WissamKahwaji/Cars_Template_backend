import express from "express";
import {
  addClient,
  deleteClient,
  editClient,
  getOurClients,
} from "../controllers/our_clients_ctrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getOurClients);
router.post("/add-client", auth, addClient);
router.put("/edit-client/:clientId", auth, editClient);
router.delete("/delete-client/:clientId", auth, deleteClient);

export default router;
