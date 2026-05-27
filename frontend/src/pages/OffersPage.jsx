// OffersPage.jsx

import { Link } from "react-router-dom";
import {
  Heart,
  Tag
} from "lucide-react";

export default function OffersPage() {

  const offers = [

    {
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1200&auto=format&fit=crop",
      name: "Nike Lunar Drift",
      oldPrice: "$350",
      newPrice: "$280",
      discount: "20% OFF"
    },

    {
      image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1200&auto=format&fit=crop",
      name: "Puma Velocity Max",
      oldPrice: "$260",
      newPrice: "$199",
      discount: "25% OFF"
    },

    {
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop",
      name: "Adidas Street Prime",
      oldPrice: "$280",
      newPrice: "$224",
      discount: "20% OFF"
    },

    {
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
      name: "Nike Phantom Elite",
      oldPrice: "$320",
      newPrice: "$250",
      discount: "22% OFF"
    }

  ];

  return (

    <section className="bg-[#f5f5f5] min-h-screen px-6 lg:px-16 py-14">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-[#8da27f] tracking-[4px] text-[12px] font-bold">

            LIMITED PREMIUM DEALS

          </p>

          <h1 className="text-[60px] leading-[90%] font-black tracking-[-5px] mt-4">

            EXCLUSIVE
            <br />
            OFFERS

          </h1>

        </div>

        <Link
          to="/collections"
          className="h-[54px] px-8 rounded-full bg-black text-white flex items-center justify-center font-bold tracking-[2px]"
        >

          BACK

        </Link>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

        {offers.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-[34px] overflow-hidden shadow-xl"
          >

            <div className="relative h-[290px] overflow-hidden">

              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover hover:scale-110 transition duration-700"
              />

              <div className="absolute top-5 left-5 bg-[#8da27f] text-white px-5 py-2 rounded-full text-[11px] font-bold tracking-[2px]">

                {item.discount}

              </div>

              <button className="absolute top-5 right-5 w-[42px] h-[42px] rounded-full bg-white flex items-center justify-center shadow-lg">

                <Heart size={18} />

              </button>

            </div>

            <div className="p-6">

              <h1 className="text-[28px] font-black tracking-[-2px]">

                {item.name}

              </h1>

              <div className="flex items-center gap-4 mt-5">

                <p className="text-gray-400 line-through text-[18px]">

                  {item.oldPrice}

                </p>

                <p className="text-[30px] font-black">

                  {item.newPrice}

                </p>

              </div>

              <button className="w-full h-[52px] rounded-full bg-black text-white text-[12px] font-bold tracking-[2px] mt-7 hover:bg-[#8da27f] transition flex items-center justify-center gap-2">

                <Tag size={18} />
                SHOP NOW

              </button>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}