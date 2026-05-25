import Shoe1 from "../assets/Shoe1.png";
import Shoe2 from "../assets/Shoe2.png";
import Shoe3 from "../assets/Shoe3.png";
import Shoe4 from "../assets/Shoe4.png";
import { Heart } from "lucide-react";

export default function Trending() {

  const products = [

    {
      id: 1,
      image: Shoe1,
      tag: "AUTHENTIC SHIELD",
      name: "RETRO VOLT HIGH",
      category: "Technical Collection",
      price: "$240",
      status: "SOLD OUT"
    },

    {
      id: 2,
      image: Shoe2,
      tag: "NEW RELEASE",
      name: "CARBON RACER X",
      category: "Performance Elite",
      price: "$310",
      status: "LOW STOCK"
    },

    {
      id: 3,
      image: Shoe3,
      tag: "",
      name: "IGNITE RED 01",
      category: "Exclusives",
      price: "$185",
      status: ""
    },

    {
      id: 4,
      image: Shoe4,
      tag: "",
      name: "URBAN GREY SUEDE",
      category: "Street Culture",
      price: "$155",
      status: "7 RECENTLY VIEWED"
    }

  ];

  return (

    <section className="bg-[#f3f3f3] py-20">

      <div className="max-w-[1450px] mx-auto px-12">

        {/* TOP */}

        <div className="flex justify-between items-end mb-14">

          <div>

            <h1 className="text-[58px] font-black tracking-[-2px]">

              TRENDING DROPS

            </h1>

            <p className="text-gray-500 mt-2 text-[15px]">

              The latest heat, verified by experts.

            </p>

          </div>

          <button className="border-b border-black text-[14px] pb-1 hover:opacity-70 transition">

            View All Collections

          </button>

        </div>

        {/* PRODUCTS */}

        <div className="grid grid-cols-4 gap-6">

          {products.map((product) => (

            <div key={product.id}>

              {/* IMAGE */}

              <div className="relative bg-[#ececec] h-[320px] flex items-center justify-center overflow-hidden">

                {product.tag && (

                  <span className="absolute top-4 left-4 bg-white text-[10px] px-3 py-1 tracking-[1px] font-bold">

                    {product.tag}

                  </span>

                )}

                <img
                  src={product.image}
                  alt=""
                  className="w-[250px] object-contain"
                />

              </div>

              {/* CONTENT */}

              <div className="mt-5">

                <h2 className="text-[22px] font-semibold tracking-[-1px]">

                  {product.name}

                </h2>

                <p className="text-gray-500 text-[14px] mt-1">

                  {product.category}

                </p>

                <div className="flex justify-between items-center mt-4">

                  <div>

                    <h3 className="text-[24px] font-semibold">

                      {product.price}

                    </h3>

                    {product.status && (

                      <p className="text-[10px] text-red-600 tracking-[1px] mt-1">

                        {product.status}

                      </p>

                    )}

                  </div>

                  <Heart
                    size={16}
                    className="text-gray-500 cursor-pointer"
                  />

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}