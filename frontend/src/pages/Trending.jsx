import Shoe2 from "../assets/Shoe2.png";
import Shoe3 from "../assets/Shoe3.png";
import Shoe4 from "../assets/Shoe4.png";
import Shoe5 from "../assets/Shoe5.png";

import {
  Heart
} from "lucide-react";

import {
  Link
} from "react-router-dom";

export default function Trending() {

  const products = [

    {
      id: 1,
      image: Shoe2,
      badge: "AUTHENTIC SHIELD",
      badgeColor: "white",
      name: "Retro Volt High",
      category: "Luxury Streetwear",
      price: "$240",
      status: "SOLD OUT"
    },

    {
      id: 2,
      image: Shoe3,
      badge: "NEW RELEASE",
      badgeColor: "red",
      name: "Carbon Racer",
      category: "Performance Elite",
      price: "$310",
      status: "LOW STOCK"
    },

    {
      id: 3,
      image: Shoe4,
      badge: "",
      badgeColor: "",
      name: "Ignite Red",
      category: "Premium Collection",
      price: "$185",
      status: "AVAILABLE"
    },

    {
      id: 4,
      image: Shoe5,
      badge: "",
      badgeColor: "",
      name: "Urban Beige",
      category: "Lifestyle Series",
      price: "$210",
      status: "NEW DROP"
    }

  ];

  return (

    <section className="bg-white py-20">

      <div className="max-w-[1180px] mx-auto px-6">

        {/* TOP */}

        <div className="flex items-end justify-between mb-12">

          <div>

            <h1 className="text-[44px] font-black tracking-[-2px]">

              TRENDING

            </h1>

            <p className="text-gray-500 mt-2 text-[14px]">

              Curated premium sneaker releases.

            </p>

          </div>

          <Link
            to="/login"
            className="text-[13px] border-b border-black pb-1 hover:text-red-600 hover:border-red-600 transition"
          >

            View All Collections

          </Link>

        </div>

        {/* GRID */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {products.map((product) => (

            <Link
              to="/login"
              key={product.id}
              className="bg-[#f7f7f7] rounded-[26px] overflow-hidden hover:translate-y-[-8px] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
            >

              {/* IMAGE */}

              <div className="relative h-[260px] flex items-center justify-center overflow-hidden">

                {product.badge && (

                  <span
                    className={`absolute top-4 left-4 text-[10px] tracking-[1px] font-bold px-3 py-2 rounded-full ${
                      product.badgeColor === "red"
                        ? "bg-red-600 text-white"
                        : "bg-white text-black"
                    }`}
                  >

                    {product.badge}

                  </span>

                )}

                {/* HEART */}

                <button className="absolute top-4 right-4 bg-white w-[34px] h-[34px] rounded-full flex items-center justify-center shadow-md hover:bg-red-600 hover:text-white transition">

                  <Heart size={16} />

                </button>

                <img
                  src={product.image}
                  alt=""
                  className="w-[230px] hover:scale-110 transition duration-500"
                />

              </div>

              {/* CONTENT */}

              <div className="p-6">

                <h2 className="text-[22px] font-bold tracking-[-1px]">

                  {product.name}

                </h2>

                <p className="text-gray-500 text-[13px] mt-2">

                  {product.category}

                </p>

                <div className="flex justify-between items-end mt-6">

                  <div>

                    <h3 className="text-[24px] font-black">

                      {product.price}

                    </h3>

                    <p className="text-[10px] tracking-[1px] text-red-600 mt-1">

                      {product.status}

                    </p>

                  </div>

                  <button className="bg-black text-white text-[11px] px-5 py-3 rounded-full hover:bg-red-600 transition">

                    BUY

                  </button>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>

  );

}