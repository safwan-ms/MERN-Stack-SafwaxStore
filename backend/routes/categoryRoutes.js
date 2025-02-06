import express from "express";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategories,
} from "../controllers/categoryController.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, authorizedAdmin, createCategory)
  .get(authenticate, listCategories);
router
  .route("/:categoryId")
  .put(authenticate, authorizedAdmin, updateCategory)
  .delete(authenticate, authorizedAdmin, removeCategory);

export default router;
