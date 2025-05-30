import {
  removeFromCloudinary,
  uploadToCloudinary,
} from "../helpers/cloudinaryHelper.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      brand,
      countInStock,
    } = req.body;

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

    if (!req.file) {
      return res.status(400).json({ error: "Product image is required!" });
    }
    // Upload image to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);
    const { secure_url: url, public_id: publicId } = result;
    console.log("RESULR", result);
    console.log("Url :", url);
    console.log("PublicId :", publicId);

    const product = new Product({
      name,
      description,
      price,
      category,
      quantity,
      brand,
      countInStock,
      image: { url, publicId },
    });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.log("Error occurred in addProduct ", error.message);
    res.status(400).json({ message: `Failed to add product ${error.message}` });
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      brand,
      countInStock,
    } = req.body;
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // If new image is uploaded
    if (req.file) {
      // Remove old image from Cloudinary
      if (product.image && product.image.publicId) {
        await removeFromCloudinary(product.image.publicId);
      }

      //Upload new image
      const result = await uploadToCloudinary(req.file.buffer);
      const { secure_url: url, public_id: publicId } = result;

      product.image = { url, publicId };
    }
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
      case !countInStock:
        return res.status(400).json({ error: "CountInStock is required!" });
    }

    // Update only provided fields
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.quantity = quantity;
    product.brand = brand;
    product.countInStock = countInStock;

    await product.save();
    res
      .status(201)
      .json({ message: "Product Updated successfully ", data: product });
  } catch (error) {
    console.error(error);
    res.status(400).json("Failed to update product", error.message);
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    // Find the product first
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(400).json({ message: "Product not found" });

    // Extract publicId from the stored product image
    const publicId = product.image?.publicId;

    if (publicId) {
      await removeFromCloudinary(publicId);
    }

    // Now delete the product from the database
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Failed to remove product", error: error.message });
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

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ message: "Product not found" });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(400);
    throw new Error("Failed to fetch all products");
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    const alreadyReviewed = await product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: "Already reviewed" });
    }

    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    return res.status(201).json({ message: "Review added" });
  } catch (error) {
    console.log("Error while handling addProductReview:", error.message);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);

    if (!products.length) {
      return res.status(404).json({
        message: "No Top rated products were found",
      });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 }).limit(5);

    if (!products) {
      return res.status(404).json({ message: "Product not found!" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};

    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

export {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
};
