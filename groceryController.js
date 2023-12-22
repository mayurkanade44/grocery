import Grocery from "./groceryModel.js";

export const addGrocery = async (req, res) => {
  const { name, price, quantity } = req.body;
  try {
    if (!name || !price || !quantity)
      return res.status(400).json({ msg: "Please provide required f" });

    const grocery = await Grocery.findOne({ name });
    if (grocery)
      return res.status(400).json({ msg: "Grocery name already exist" });

    await Grocery.create({ name, price, quantity });

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
    const grocery = await Grocery.find();

    return res.json(grocery);
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
