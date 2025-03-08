import express from "express";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import { createOrder } from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(authenticate, createOrder);

export default router;
