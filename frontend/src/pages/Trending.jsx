// ======================================
// Trending.jsx
// ======================================

import { Link, useLocation } from "react-router-dom";

import { Heart } from "lucide-react";

import Shoe2 from "../assets/Shoe2.png";
import Shoe3 from "../assets/Shoe3.png";
import Shoe4 from "../assets/Shoe4.png";
import Shoe5 from "../assets/Shoe5.png";

export default function Trending() {

  const location = useLocation();

  // CHECK IF USER IS IN ACTUAL HOME PAGE
  const isActualHome = location.pathname === "/mainhome";

  const shoes = [
    {
      image: Shoe2,
      title: "Jordan Phantom",
      price: "$320",
      stock: "LOW STOCK"
    },
    {
      image: Shoe3,
      title: "Noir Runner",
      price: "$290",
      stock: "SOLD OUT"
    },
    {
      image: Shoe4,
      title: "Velocity Max",
      price: "$350",
      stock: "LIMITED"
    },
    {
      image: Shoe5,
      title: "Beige Storm",
      price: "$270",
      stock: "LOW STOCK"
    }
  ];

  return (

    <section className="px-6 lg:px-16 py-24 bg-white">

      {/* TOP */}

      <div className="flex items-end justify-between mb-14">

        <div>

          <p className="text-[#8da27f] font-bold tracking-[3px] text-[13px]">

            NEW RELEASE

          </p>

          <h1 className="text-[52px] font-black tracking-[-3px] text-black mt-3">

            TRENDING

          </h1>

        </div>

        {/* IMPORTANT FIX */}

        <Link
          to={isActualHome ? "/collections" : "/login"}
          className="text-black font-semibold hover:text-[#8da27f] transition duration-300"
        >

          View All Collections →

        </Link>

      </div>

      {/* SHOES */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">

        {shoes.map((shoe, index) => (

          <Link
            key={index}
            to={isActualHome ? "/collections" : "/login"}
            className="group bg-[#f7f7f7] rounded-[30px] p-6 overflow-hidden hover:shadow-2xl transition"
          >

            {/* TOP */}

            <div className="flex justify-between items-center">

              <p className="bg-white px-4 py-2 rounded-full text-[11px] font-bold">

                AUTHENTIC SHIELD

              </p>

              <Heart className="text-gray-400 group-hover:text-red-500 transition" />

            </div>

            {/* IMAGE */}

            <img
              src={shoe.image}
              alt=""
              className="w-full mt-8 group-hover:scale-110 transition duration-700"
            />

            {/* TITLE */}

            <h2 className="text-[24px] font-black mt-8">

              {shoe.title}

            </h2>

            {/* TEXT */}

            <p className="text-gray-500 text-[14px] leading-[26px] mt-4">

              Premium luxury sneaker crafted with elite comfort, timeless streetwear aesthetics, and modern performance styling.

            </p>

            {/* PRICE */}

            <div className="flex justify-between mt-6 items-center">

              <h3 className="text-[24px] font-black">

                {shoe.price}

              </h3>

              <p className="text-[#8da27f] text-[13px] font-bold">

                {shoe.stock}

              </p>

            </div>

          </Link>

        ))}

      </div>

    </section>

  );

}