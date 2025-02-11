import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    //Validation
    switch (true) {
      case !name:
        return res.status(400).json({ error: "Name is required!" });
      case !description:
        return res.status(400).json({ error: "Description is required!" });
      case !price:
        return res.status(400).json({ error: "Price is required!" });
      case !category:
        return res.status(400).json({ error: "Category is required!" });
      case !quantity:
        return res.status(400).json({ error: "Quantity is required!" });
      case !brand:
        return res.status(400).json({ error: "Brand is required!" });
    }

    const product = Product({ ...req.fields });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.log("Error occurred in addProduct ", error);
    res.status(400).json("Failed to save product", error.message);
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    switch (true) {
      case !name:
        return res.status(400).json({ error: "Name is required!" });
      case !description:
        return res.status(400).json({ error: "Description is required!" });
      case !price:
        return res.status(400).json({ error: "Price is required!" });
      case !category:
        return res.status(400).json({ error: "Category is required!" });
      case !quantity:
        return res.status(400).json({ error: "Quantity is required!" });
      case !brand:
        return res.status(400).json({ error: "Brand is required!" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    if (!product) return res.status(404).json({ error: "Product not found!" });

    await product.save();
    res.status(202).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json("Failed to update product", error.message);
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) return res.status(400).json({ message: "Product not found" });

    res
      .status(200)
      .json({ message: "Product deleted successfully", product: product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Failed to remove product", error.message);
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const product = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      product,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: `Failed to fetchProducts: ${error.message}`,
    });
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.status(200).json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ message: "Product not found" });
  }
});

export {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
};
