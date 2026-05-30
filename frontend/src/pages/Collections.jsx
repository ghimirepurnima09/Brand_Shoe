
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Shoe1 from "../assets/Shoe1.png";

export default function Collections() {

  // STATE

  const [products, setProducts] = useState([]);

  // FETCH PRODUCTS

  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/products/getproducts"
      );

      setProducts(response.data.products);

    } catch (error) {

      console.log("ERROR FETCHING PRODUCTS:", error);

    }

  };

  // PAGE LOAD
  

  useEffect(() => {

    fetchProducts();

  }, []);

  return (

    <section className="px-6 lg:px-16 py-24 bg-black">

      {/* TOP SECTION */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* LEFT CARD */}

        <Link
          to="/collections"
          className="relative rounded-[36px] overflow-hidden h-[620px] group bg-[#1d1d1d]"
        >

          <img
            src={Shoe1}
            alt=""
            className="absolute inset-0 w-full h-full object-contain p-10 group-hover:scale-105 transition duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

          <div className="absolute bottom-10 left-10">

            <p className="text-white/70 tracking-[3px] text-[12px] font-semibold uppercase">

              Spring 2026

            </p>

            <h1 className="text-white text-[62px] leading-[90%] font-black mt-4 tracking-[-4px]">

              THE NOIR
              <br />
              SERIES

            </h1>

          </div>

        </Link>

        {/* RIGHT SIDE */}

        <div className="flex flex-col gap-8">

          {/* MOST SOLD */}

          <Link
            to="/mostsold"
            className="relative rounded-[36px] overflow-hidden h-[295px] group"
          >

            <img
              src="https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1200&auto=format&fit=crop"
              alt=""
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />

            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute bottom-8 left-8">

              <p className="text-white/70 tracking-[3px] text-[11px] uppercase">

                Best Seller

              </p>

              <h1 className="text-white text-[42px] font-black tracking-[-3px] mt-3">

                MOST SOLD

              </h1>

            </div>

          </Link>

          {/* OFFERS */}

          <Link
            to="/offers"
            className="relative rounded-[36px] overflow-hidden h-[295px] bg-[#6f8f62] flex items-center justify-center group"
          >

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500"></div>

            <h1 className="relative z-10 text-white text-[54px] font-black tracking-[-3px] text-center">

              ARCHIVE
              <br />
              DROPS

            </h1>

          </Link>

        </div>

      </div>

      {/* PRODUCTS SECTION */}

      <div className="mt-24">

        {/* TITLE */}

        <div className="mb-12">

          <p className="text-[#8da27f] tracking-[4px] text-[12px] font-bold uppercase">

            Latest Products

          </p>

          <h1 className="text-white text-[58px] leading-[90%] font-black tracking-[-4px] mt-4">

            NEW
            <br />
            ARRIVALS

          </h1>

        </div>

        {/* PRODUCTS GRID */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.map((product) => (

            <div
              key={product.id}
              className="bg-[#161616] rounded-[32px] overflow-hidden border border-white/5 hover:-translate-y-2 transition duration-500"
            >

              {/* IMAGE */}

              <div className="h-[280px] overflow-hidden">

                <img
                  src={product.image}
                  alt=""
                  className="w-full h-full object-cover hover:scale-110 transition duration-700"
                />

              </div>

              {/* CONTENT */}

              <div className="p-6">

                <p className="text-[#8da27f] text-[11px] tracking-[3px] uppercase font-semibold">

                  {product.category}

                </p>

                <h1 className="text-white text-[28px] font-black tracking-[-2px] mt-3">

                  {product.name}

                </h1>

                <p className="text-gray-400 text-[14px] leading-[28px] mt-4">

                  {product.description}

                </p>

                <div className="flex items-center justify-between mt-8">

                  <h2 className="text-white text-[30px] font-black">

                    Rs. {product.price}

                  </h2>

                  <button className="h-[48px] px-6 rounded-full bg-[#8da27f] text-white text-[11px] font-bold tracking-[2px] hover:bg-white hover:text-black transition">

                    BUY NOW

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}