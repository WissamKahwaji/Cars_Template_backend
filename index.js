import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import colorsRoutes from "./routes/colors_router.js";
import homeRoutes from "./routes/home_router.js";
import ratesRoutes from "./routes/rates_router.js";
import servicesRoutes from "./routes/service_routes.js";
import aboutRoutes from "./routes/about_router.js";
import carRoutes from "./routes/car_router.js";
import navRoutes from "./routes/nav_router.js";
import contactRoutes from "./routes/contact_router.js";
import ourClientsRoutes from "./routes/our_client_router.js";
import bookingRoutes from "./routes/booking_router.js";
import enquiryRoutes from "./routes/enquiry_router.js";
const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/quicktime" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).fields([
    { name: "img", maxCount: 1 },
    { name: "imgs", maxCount: 5 },
    { name: "chImgs", maxCount: 15 },
    { name: "landingImg", maxCount: 1 },
    { name: "logoImg", maxCount: 1 },
    { name: "imgHeading", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ])
);

app.use("/colors", colorsRoutes);
app.use("/home", homeRoutes);
app.use("/rates", ratesRoutes);
app.use("/services", servicesRoutes);
app.use("/about", aboutRoutes);
app.use("/carPage", carRoutes);
app.use("/nav", navRoutes);
app.use("/contact", contactRoutes);
app.use("/ourClients", ourClientsRoutes);
app.use("/bookings", bookingRoutes);
app.use("/inquiry", enquiryRoutes);

app.get("/", (req, res) => res.send("Server is Running>>>>>"));

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server Running on ${PORT}`);
    })
  )
  .catch(error => console.log(error.message));

mongoose.set("strictQuery", true);
