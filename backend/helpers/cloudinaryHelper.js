import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier"; // To stream buffer to Cloudinary

const uploadToCloudinary = async (buffer) => {
  try {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" }, // Detect resource type (image, video, etc.)
      (error, result) => {
        if (error) {
          throw new Error(`Cloudinary upload failed: ${error.message}`);
        }
        return result; // This is the response from Cloudinary
      }
    );

    // Stream the buffer directly to Cloudinary
    streamifier.createReadStream(buffer).pipe(stream); // Pipe buffer into the Cloudinary upload stream

  } catch (error) {
    console.error("Error while uploading to Cloudinary ", error);
    throw new Error("Error while uploading to Cloudinary");
  }
};


const removeFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return { result };
  } catch (error) {
    console.error("Error while removing from Cloudinary", error);
    throw new Error("Error while removing from Cloudinary");
  }
};

export { uploadToCloudinary, removeFromCloudinary };
