import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    required: true,
    unique: true,
  },

  excerpt: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  image: {
    url: String,
    public_id: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Blog", blogSchema);
