import express from "express";
import { uploadFile } from "../controllers/file.controller.js";
import { upload } from "../utils/fileUpload.js";
import { userAuth } from "../middlewares/auth.middleware.js";

const fileRoutes = express.Router();

fileRoutes.post("/upload", userAuth, upload.single("file"), uploadFile);

export default fileRoutes;
