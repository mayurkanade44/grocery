import Category from "./categoryModel.js";
import Grocery from "./groceryModel.js";

export const addGrocery = async (req, res) => {
  const { name, price, quantity, category } = req.body;
  try {
    if (!name || !price || !quantity || !category)
      return res.status(400).json({ msg: "Please provide required fields" });

    const grocery = await Grocery.findOne({ name });
    if (grocery)
      return res.status(400).json({ msg: "Grocery name already exist" });

    await Grocery.create({ name, price, quantity, category });

    //in real world app you don't fetch data in post request. i did this to avoid re-rendering/useEffect in my react app as i have not used 3rd any libery for fetching
    const groceries = await Grocery.find();

    return res
      .status(201)
      .json({ msg: `${name} is added to the inventory`, groceries });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const updateGrocery = async (req, res) => {
  const { name, price, quantity } = req.body;
  const { id } = req.params;
  try {
    if (!name || !price || !quantity)
      return res.status(400).json({ msg: "Please provide required fields" });

    const grocery = await Grocery.findById(id);
    if (!grocery) return res.status(400).json({ msg: "Grocery not found" });

    grocery.name = name;
    grocery.price = price;
    grocery.quantity = quantity;
    await grocery.save();

    return res.status(200).json({ msg: `${name} is updated successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const getAllGroceries = async (req, res) => {
  try {
    const allGroceries = await Grocery.find().populate("category");

    const groceries = [];
    if (allGroceries.length > 0) {
      for (let grocery of allGroceries) {
        const price =
          grocery.price - (grocery.price / 100) * grocery.category?.discount;
        groceries.push({
          _id: grocery._id,
          name: grocery.name,
          originalPrice: grocery.price,
          discountedPrice: price,
          quantity: grocery.quantity,
          category: grocery.category._id,
        });
      }
    }

    return res.json(groceries);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const deleteGrocery = async (req, res) => {
  const { id } = req.params;
  try {
    const grocery = await Grocery.findById(id);
    if (!grocery) return res.status(400).json({ msg: "Grocery not found" });

    await Grocery.findByIdAndDelete(id);

    //in real world app you don't fetch data in post request. i did this to avoid re-rendering/useEffect in my react app as i have not used 3rd any libery for fetching
    const groceries = await Grocery.find();

    return res.status(200).json({ msg: "Deleted successfully", groceries });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const addCategory = async (req, res) => {
  const { name, discount } = req.body;
  try {
    if (!name || !discount) {
      return res.status(400).json({ msg: "Please provide all values" });
    }
    const category = await Category.findOne({
      name: { $regex: name, $options: "i" },
    });
    if (category)
      return res.status(400).json({ msg: "Category already exists" });
    await Category.create({ name, discount });

    const categories = await Category.find(); ///in real world app you shouldn't fetch data in post request
    return res.status(201).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const editCategory = async (req, res) => {
  const { name, discount, id } = req.body;
  try {
    if (!name || !discount) {
      return res.status(400).json({ msg: "Please required fields" });
    }

    const category = await Category.findById(id);
    if (!category) return res.status(400).json({ msg: "category not found" });

    category.name = name;
    category.discount = discount;

    await category.save();

    const categories = await Category.find(); ///in real world app you shouldn't fetch data in post request
    return res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};
