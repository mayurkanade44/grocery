import express from "express";
import {
  addGrocery,
  deleteGrocery,
  getAllGroceries,
  updateGrocery,
} from "./groceryController.js";
const router = express.Router();

router.route("/").post(addGrocery).get(getAllGroceries);
router.route("/:id").put(updateGrocery).delete(deleteGrocery);

export default router;
