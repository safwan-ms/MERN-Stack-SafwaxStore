import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 32,
    unique: true,
  },
});

export default mongoose.model("Category", categorySchema);
