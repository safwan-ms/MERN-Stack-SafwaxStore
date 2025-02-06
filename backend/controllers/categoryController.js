import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(404).json({ message: "Name is required!" });
    }

    const existingName = await Category.findOne({ name });
    if (existingName) {
      return res.status(404).json({ message: "Already exists" });
    }

    const category = await new Category({ name }).save();
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.name = name;

    const updatedCategory = await df.save();
    res.json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
});

const removeCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category removed successfully", category });
  } catch (error) {
    console.log(error);
  }
});

const listCategories = asyncHandler(async (req, res) => {
  try {
    const all = await Category.find();
    res.json(all);
  } catch (error) {
    console.log(error);
  }
});

const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });

    if (!category) return res.status(404).json({ error: "Category not found" });

    res.status(202).json(category);
  } catch (error) {
    console.log(error);
  }
});

export {
  createCategory,
  updateCategory,
  removeCategory,
  listCategories,
  readCategory,
};
