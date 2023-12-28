import express from "express";
import {
  addCategory,
  addGrocery,
  deleteGrocery,
  getAllCategories,
  getAllGroceries,
  updateGrocery,
} from "./groceryController.js";
const router = express.Router();

router.route("/").post(addGrocery).get(getAllGroceries);
router.route("/:id").put(updateGrocery).delete(deleteGrocery);
router.route("/category").post(addCategory).get(getAllCategories);

export default router;
