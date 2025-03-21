import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Error while uploading to cloudinary ", error);
    throw new Error("Error while uploading to cloudinary");
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
