import express from "express";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
} from "../controllers/orderController.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, authorizedAdmin, getAllOrders);

router.route("/mine").get(authenticate, getUserOrders);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calculateTotalSalesByDate);
router.route("/:id").get(authenticate, findOrderById);
export default router;
