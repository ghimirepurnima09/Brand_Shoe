// ProductDetails.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/singleproduct/${id}`
        );

        if (response.data.success) {
          setProduct(response.data.product);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-3xl font-bold">Loading...</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-white pt-[120px] px-6 lg:px-16 pb-20">
        <div className="grid lg:grid-cols-2 gap-16">

          <div className="grid grid-cols-[100px_1fr] gap-5">

            <div className="flex flex-col gap-4">
              <img
                src={product.image}
                alt=""
                className="w-24 h-24 object-cover rounded-xl border"
              />

              <img
                src={product.image}
                alt=""
                className="w-24 h-24 object-cover rounded-xl border"
              />

              <img
                src={product.image}
                alt=""
                className="w-24 h-24 object-cover rounded-xl border"
              />

              <img
                src={product.image}
                alt=""
                className="w-24 h-24 object-cover rounded-xl border"
              />
            </div>

            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full rounded-3xl shadow-xl"
              />
            </div>

          </div>

          <div>

            <p className="text-[#8da27f] uppercase tracking-[4px] font-bold">
              {product.category}
            </p>

            <h1 className="text-5xl font-black mt-4">
              {product.name}
            </h1>

            <h2 className="text-4xl font-black mt-6">
              Rs. {product.price}
            </h2>

            <p className="text-gray-500 mt-6 leading-8">
              {product.description}
            </p>

            <div className="mt-10">
              <h3 className="font-bold text-lg mb-4">
                Select Color
              </h3>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-black border-4 border-black"></div>
                <div className="w-10 h-10 rounded-full bg-red-500"></div>
                <div className="w-10 h-10 rounded-full bg-blue-500"></div>
                <div className="w-10 h-10 rounded-full bg-green-500"></div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-bold text-lg mb-4">
                Select Size
              </h3>

              <div className="flex flex-wrap gap-3">
                <button className="w-14 h-14 rounded-full border font-bold">
                  39
                </button>

                <button className="w-14 h-14 rounded-full border font-bold">
                  40
                </button>

                <button className="w-14 h-14 rounded-full border font-bold">
                  41
                </button>

                <button className="w-14 h-14 rounded-full border font-bold">
                  42
                </button>

                <button className="w-14 h-14 rounded-full border font-bold">
                  43
                </button>
              </div>
            </div>

            <div className="flex gap-4 mt-12">

              <button className="h-14 px-10 rounded-full bg-black text-white font-bold hover:bg-[#8da27f] transition">
                ADD TO CART
              </button>

              <button className="h-14 px-10 rounded-full bg-[#8da27f] text-white font-bold hover:bg-black transition">
                BUY NOW
              </button>

            </div>

          </div>

        </div>
      </section>
    </>
  );
}