import express from "express";
import {
  addCategory,
  addGrocery,
  deleteGrocery,
  editCategory,
  getAllCategories,
  getAllGroceries,
  updateGrocery,
} from "./groceryController.js";
const router = express.Router();

router.route("/").post(addGrocery).get(getAllGroceries);
router
  .route("/category")
  .post(addCategory)
  .get(getAllCategories)
  .put(editCategory);
router.route("/:id").put(updateGrocery).delete(deleteGrocery);

export default router;
