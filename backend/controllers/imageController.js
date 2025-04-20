import { uploadToCloudinary } from "../helpers/cloudinaryHelper.js";

const uploadImage = async (req, res) => {
  try {
    console.log("Hello World");
    // Check if the file is missing
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required! Please upload an image",
      });
    }

    // Upload image to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);
    const { secure_url: url, public_id: publicId } = result;
    console.log("RESULT", result);
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
