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
  });
  const [isLoading, setLoading] = useState(false);
  const [groceries, setGroceries] = useState([]);
  const [edit, setEdit] = useState({ status: false, id: "" });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    if (!edit.status) {
      fetchGroceries();
    }
  }, [edit.status]);

  return (
    <div className="m-5 flex justify-center flex-col items-center h-full">
      <ToastContainer position="top-center" autoClose={2000} />
      {isLoading && <Loading />}
      <h1 className="text-center text-4xl font-bold">Grocery Inventory</h1>
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
  );
}

export default App;
