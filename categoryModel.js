import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  discount: { type: Number, required: true },
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
