import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "./components/Button";
import Groceries from "./components/Groceries";
import Loading from "./components/Loading";

function App() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "Select",
  });
  const [categoryForm, setCategoryForm] = useState({ name: "", discount: "" });
  const [edit, setEdit] = useState({ status: false, id: "" });
  const [isLoading, setLoading] = useState(false);
  const [groceries, setGroceries] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchGroceries = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/grocery");
      setGroceries(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/grocery/category");
      console.log(res.data);
      setCategories(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
      setLoading(false);
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/grocery/category", categoryForm);
      setCategories(res.data);
      toast.success("Category added");
      setLoading(false);
      setCategoryForm({ name: "", discount: "" });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.category === "Select")
      return toast.error("Please select category");
    setLoading(true);
    let res;
    try {
      if (edit.status) {
        res = await axios.put(`/api/grocery/${edit.id}`, form);
      } else {
        res = await axios.post("/api/grocery", form);
        setGroceries(res.data.groceries);
      }
      toast.success(res.data.msg);
      setForm({ name: "", price: "", quantity: "" });
      setEdit({ status: false, id: "" });
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(`/api/grocery/${id}`);
      toast.success(res.data.msg);
      setGroceries(res.data.groceries);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
      setLoading(false);
    }
  };

  const handleEdit = (grocery) => {
    setEdit({ status: true, id: grocery._id });
    setForm({
      name: grocery.name,
      price: grocery.price,
      quantity: grocery.quantity,
    });
  };

  useEffect(() => {
    fetchGroceries();
  }, [edit]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="m-5">
      <ToastContainer position="top-center" autoClose={2000} />
      {isLoading && <Loading />}
      <h1 className="text-center text-4xl font-bold">Grocery Inventory</h1>
      <div className="grid md:grid-cols-2 gap-x-10">
        <div>
          <form
            onSubmit={handleSubmit}
            className="md:flex md:space-x-4 space-y-3 my-5 md:space-y-0 items-center mt-10"
          >
            <div>
              <label htmlFor="name" className="mb-1 block font-medium">
                Grocery Name
              </label>
              <input
                className="w-full py-0.5 px-2 border-2 rounded-md outline-none transition border-neutral-300 focus:border-black"
                placeholder="Apple"
                value={form.name}
                required
                type="text"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div>
              <p className="mb-1 block font-medium">Category</p>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, category: e.target.value }))
                }
                className="border-2 rounded-md mr-2 py-0.5 w-40"
              >
                {["Select", ...categories].map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="price" className="mb-1 block font-medium">
                Price
              </label>
              <input
                className="w-full py-0.5 px-2 border-2 rounded-md outline-none transition border-neutral-300 focus:border-black"
                placeholder="$10"
                value={form.price}
                required
                type="number"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, price: e.target.value }))
                }
              />
            </div>
            <div>
              <label htmlFor="quantity" className="mb-1 block font-medium">
                Quantity
              </label>
              <input
                className="w-full py-0.5 px-2 border-2 rounded-md outline-none transition border-neutral-300 focus:border-black"
                placeholder="total number"
                value={form.quantity}
                required
                type="number"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, quantity: e.target.value }))
                }
              />
            </div>
            <Button
              type="submit"
              label={edit.status ? "Update" : "Add"}
              color="bg-green-600"
            />
          </form>
          <Groceries
            groceries={groceries}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
        <div>
          <div className="flex justify-center">
            <form
              onSubmit={handleCategorySubmit}
              className="md:flex md:space-x-4 space-y-3 my-5 md:space-y-0 items-center mt-10"
            >
              <div>
                <label htmlFor="name" className="mb-1 block font-medium">
                  Category Name
                </label>
                <input
                  className="w-full py-0.5 px-2 border-2 rounded-md outline-none transition border-neutral-300 focus:border-black"
                  placeholder="Fruit"
                  value={categoryForm.name}
                  required
                  type="text"
                  onChange={(e) =>
                    setCategoryForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label htmlFor="discount" className="mb-1 block font-medium">
                  Discount
                </label>
                <input
                  className="w-full py-0.5 px-2 border-2 rounded-md outline-none transition border-neutral-300 focus:border-black"
                  placeholder="50%"
                  value={categoryForm.discount}
                  required
                  type="number"
                  onChange={(e) =>
                    setCategoryForm((prev) => ({
                      ...prev,
                      discount: e.target.value,
                    }))
                  }
                />
              </div>
              <Button type="submit" label="Add Category" color="bg-green-600" />
            </form>
          </div>
          <table className="w-full border whitespace-nowrap border-neutral-500 bg-text">
            <thead>
              <tr className="h-8 w-full leading-none">
                <th className="font-bold text-center border-neutral-500 border-2 px-3">
                  Category Name
                </th>
                <th className="font-bold text-center border-neutral-500 border-2 px-3">
                  Discount
                </th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category) => (
                <tr
                  key={category._id}
                  className="h-8 text-[14px] border-b border-neutral-500 hover:bg-slate-200"
                >
                  <td className="px-3 border-r text-center border-neutral-500">
                    {category.name}
                  </td>
                  <td className="px-3 border-r text-center border-neutral-500">
                    {category.discount} %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
