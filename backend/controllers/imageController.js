import { uploadToCloudinary } from "../helpers/cloudinaryHelper.js";

const uploadImage = async (req, res) => {
  try {
    // Check if the file is missing
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required! Please upload an image",
      });
    }

    // Upload image to Cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path);

    // Send response with image URL and public ID
    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: { url, publicId }, // Returning the image details
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

export default uploadImage;
