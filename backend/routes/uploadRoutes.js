import express from "express";
import uploadMiddleware from "../middlewares/uploadMiddleware.js";
import uploadImageController from "../controllers/imageController.js";

const router = express.Router();

router.post("/", uploadMiddleware, uploadImageController);

export default router;
