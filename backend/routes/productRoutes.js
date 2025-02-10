import express from "express";
import formidable from "express-formidable";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import { addProduct } from "../controllers/productController.js";
const router = express.Router();
router.route("/").post(authenticate, authorizedAdmin, formidable(), addProduct);

export default router;
