// Trending.jsx

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

    <section className="px-6 lg:px-16 py-24 bg-white">

      <div className="flex items-end justify-between mb-14">

        <div>

          <p className="text-[#c8161d] font-bold tracking-[3px] text-[13px]">

            NEW RELEASE

          </p>

          <h1 className="text-[52px] font-black tracking-[-3px] text-black mt-3">

            TRENDING

          </h1>

        </div>

        <Link
          to="/login"
          className="text-black font-semibold hover:text-[#c8161d]"
        >

          View All Collections →

        </Link>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">

        {shoes.map((shoe, index) => (

          <Link
            key={index}
            to="/login"
            className="group bg-[#f7f7f7] rounded-[30px] p-6 overflow-hidden hover:shadow-2xl transition"
          >

            <div className="flex justify-between items-center">

              <p className="bg-white px-4 py-2 rounded-full text-[11px] font-bold">

                AUTHENTIC SHIELD

              </p>

              <Heart className="text-gray-400 group-hover:text-red-500 transition" />

            </div>

            <img
              src={shoe.image}
              alt=""
              className="w-full mt-8 group-hover:scale-110 transition duration-700"
            />

            <h2 className="text-[24px] font-black mt-8">

              {shoe.title}

            </h2>

            <div className="flex justify-between mt-6 items-center">

              <h3 className="text-[24px] font-black">

                {shoe.price}

              </h3>

              <p className="text-[#c8161d] text-[13px] font-bold">

                {shoe.stock}

              </p>

            </div>

          </Link>

        ))}

      </div>

    </section>

  );

}