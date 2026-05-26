// ==========================
// Trending.jsx
// ==========================

import { Link } from "react-router-dom";

import { Heart } from "lucide-react";

import Shoe2 from "../assets/Shoe2.png";
import Shoe3 from "../assets/Shoe3.png";
import Shoe4 from "../assets/Shoe4.png";
import Shoe5 from "../assets/Shoe5.png";

export default function Trending() {

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

    <section className="px-6 lg:px-16 py-16 bg-white">

      {/* HEADER */}

      <div className="flex items-end justify-between mb-10">

        <div>

          <p className="text-[#8da27f] font-bold tracking-[3px] text-[12px]">

            NEW RELEASE

          </p>

          <h1 className="text-[48px] lg:text-[56px] font-black tracking-[-3px] text-black mt-2">

            TRENDING

          </h1>

        </div>

        <Link
          to="/login"
          className="text-black font-semibold hover:text-[#8da27f] transition"
        >

          View All Collections →

        </Link>

      </div>

      {/* CARDS */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

        {shoes.map((shoe, index) => (

          <Link
            key={index}
            to="/login"
            className="group bg-[#f7f7f7] rounded-[26px] p-5 overflow-hidden hover:shadow-2xl transition duration-300"
          >

            {/* TOP */}

            <div className="flex items-center justify-between">

              <p className="bg-white px-4 py-2 rounded-full text-[11px] font-bold">

                AUTHENTIC

              </p>

              {/* WISHLIST */}

              <button className="w-[38px] h-[38px] rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-[#8da27f] transition group">

                <Heart
                  size={18}
                  className="text-gray-500 group-hover:text-white transition"
                />

              </button>

            </div>

            {/* IMAGE */}

            <img
              src={shoe.image}
              alt=""
              className="w-full mt-6 group-hover:scale-105 transition duration-700"
            />

            {/* TITLE */}

            <h2 className="text-[24px] font-black mt-6">

              {shoe.title}

            </h2>

            {/* PRICE */}

            <div className="flex justify-between items-center mt-5">

              <h3 className="text-[24px] font-black">

                {shoe.price}

              </h3>

              <p className="text-[#8da27f] text-[12px] font-bold">

                {shoe.stock}

              </p>

            </div>

          </Link>

        ))}

      </div>

    </section>

  );

}