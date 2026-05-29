import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

export default function AddProduct() {

  const [name, setName] = useState("");

  const [category, setCategory] = useState("");

  const [price, setPrice] = useState("");

  const [quantity, setQuantity] = useState("");

  const [description, setDescription] = useState("");

  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

  // ADD PRODUCT

  const handleAddProduct = async () => {

    if (
      !name ||
      !category ||
      !price ||
      !quantity ||
      !description ||
      !image
    ) {

      toast.error("Please fill all fields");

      return;

    }

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/products/addproduct",
        {
          name,
          category,
          price,
          quantity,
          description,
          image
        }
      );

      toast.success(response.data.message);

      setName("");
      setCategory("");
      setPrice("");
      setQuantity("");
      setDescription("");
      setImage("");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <section className="min-h-screen bg-[#f3f3f3] px-6 py-10">

      <div className="max-w-[700px] mx-auto bg-white p-8 rounded-[30px] shadow-lg">

        <h1 className="text-[45px] font-black tracking-[-3px]">

          Add Product

        </h1>

        <div className="space-y-5 mt-8">

          {/* PRODUCT NAME */}

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-[58px] rounded-[14px] border border-gray-300 px-4 outline-none"
          />

          {/* CATEGORY */}

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-[58px] rounded-[14px] border border-gray-300 px-4 outline-none"
          >

            <option value="">Select Category</option>

            <option value="Men">Men</option>

            <option value="Women">Women</option>

            <option value="Kids">Kids</option>

          </select>

          {/* PRICE */}

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full h-[58px] rounded-[14px] border border-gray-300 px-4 outline-none"
          />

          {/* QUANTITY */}

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full h-[58px] rounded-[14px] border border-gray-300 px-4 outline-none"
          />

          {/* IMAGE */}

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full h-[58px] rounded-[14px] border border-gray-300 px-4 outline-none"
          />

          {/* DESCRIPTION */}

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-[150px] rounded-[14px] border border-gray-300 px-4 py-4 outline-none resize-none"
          />

          {/* BUTTON */}

          <button
            onClick={handleAddProduct}
            disabled={loading}
            className="w-full h-[58px] rounded-[14px] bg-black text-white font-bold tracking-[2px] hover:bg-[#8da27f] transition"
          >

            {
              loading
                ? "ADDING..."
                : "ADD PRODUCT"
            }

          </button>

        </div>

      </div>

    </section>

  );

}