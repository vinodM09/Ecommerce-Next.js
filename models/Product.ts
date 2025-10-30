import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: { 
    type: String, 
    unique: true
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: String,
  },
  inventory: {
    type: Number,
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now
  },
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);