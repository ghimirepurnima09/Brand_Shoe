import { Link } from "react-router-dom";

import {
  Heart,
  Tag,
  ArrowLeft,
  Sparkles,
  Flame
} from "lucide-react";

export default function OffersPage() {

  const offers = [

    {
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
      name: "Nike Air Max Elite",
      oldPrice: "$420",
      newPrice: "$340",
      offer: "20% OFF"
    },

    {
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop",
      name: "Adidas Prime Boost",
      oldPrice: "$390",
      newPrice: "$310",
      offer: "18% OFF"
    }

  ];

  return (

    <section className="bg-[#f5f5f5] min-h-screen pb-20">

      {/* HERO */}

      <div className="relative h-[520px] overflow-hidden rounded-b-[50px]">

        <img
          src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1800&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70"></div>

        {/* BACK */}

        <Link
          to="/mainhome"
          className="absolute top-8 left-6 lg:left-16 z-20 w-[52px] h-[52px] rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-black transition duration-300 shadow-lg"
        >

          <ArrowLeft size={22} />

        </Link>

        {/* CONTENT */}

        <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-16">

          <p className="text-[#d7e5d0] tracking-[4px] text-[12px] font-bold">

            LIMITED PREMIUM OFFERS

          </p>

          <h1 className="text-white text-[65px] lg:text-[95px] leading-[88%] font-black tracking-[-6px] mt-5">

            EXCLUSIVE
            <br />
            DISCOUNTS

          </h1>

        </div>

      </div>

      {/* TOP BUTTONS */}

      <div className="flex flex-wrap gap-4 px-6 lg:px-16 mt-12">

        <Link
          to="/collections"
          className="h-[54px] px-8 rounded-full bg-white text-black font-bold tracking-[2px] text-[12px] flex items-center gap-2 shadow-md hover:bg-black hover:text-white transition"
        >

          <Sparkles size={18} />

          NEW COLLECTIONS

        </Link>

        <Link
          to="/mostsold"
          className="h-[54px] px-8 rounded-full bg-white text-black font-bold tracking-[2px] text-[12px] flex items-center gap-2 shadow-md hover:bg-black hover:text-white transition"
        >

          <Flame size={18} />

          MOST SOLD

        </Link>

        {/* ACTIVE */}

        <Link
          to="/offers"
          className="h-[54px] px-8 rounded-full bg-[#8da27f] text-white font-bold tracking-[2px] text-[12px] flex items-center gap-2 shadow-lg"
        >

          <Tag size={18} />

          OFFERS

        </Link>

      </div>

      {/* PRODUCTS */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 px-6 lg:px-16">

        {offers.map((shoe, index) => (

          <div
            key={index}
            className="bg-white rounded-[34px] overflow-hidden shadow-xl"
          >

            <div className="relative h-[290px] overflow-hidden">

              <img
                src={shoe.image}
                alt=""
                className="w-full h-full object-cover hover:scale-110 transition duration-700"
              />

              <div className="absolute top-5 left-5 bg-[#8da27f] text-white px-5 py-2 rounded-full text-[11px] tracking-[2px] font-bold flex items-center gap-2">

                <Tag size={14} />

                {shoe.offer}

              </div>

              <button className="absolute top-5 right-5 w-[42px] h-[42px] rounded-full bg-white flex items-center justify-center shadow-lg">

                <Heart size={18} />

              </button>

            </div>

            <div className="p-6">

              <h1 className="text-[28px] font-black">

                {shoe.name}

              </h1>

              <div className="flex items-center gap-4 mt-6">

                <h2 className="text-[30px] font-black">

                  {shoe.newPrice}

                </h2>

                <p className="text-gray-400 line-through text-[18px]">

                  {shoe.oldPrice}

                </p>

              </div>

              <button className="w-full h-[52px] rounded-full bg-black text-white mt-7 text-[12px] tracking-[2px] font-bold hover:bg-[#8da27f] transition">

                SHOP OFFER

              </button>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}