import mongoose from "mongoose";

const grocerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const Grocery = mongoose.model("Grocery", grocerySchema);
export default Grocery;
