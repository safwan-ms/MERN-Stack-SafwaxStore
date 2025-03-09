import express from "express";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import { createOrder, getAllOrders } from "../controllers/orderController.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, authorizedAdmin, getAllOrders);

export default router;
