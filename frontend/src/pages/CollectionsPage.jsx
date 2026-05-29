import { Link } from "react-router-dom";

import {
  Sparkles,
  Flame,
  Tag,
  Heart,
  ArrowLeft
} from "lucide-react";

export default function CollectionsPage() {

  const shoes = [
    {
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
      name: "Nike Air Max 270",
      price: "$320",
      description:
        "Premium lifestyle sneakers featuring iconic Air cushioning and modern streetwear styling."
    },

    {
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop",
      name: "Adidas Ultraboost 22",
      price: "$340",
      description:
        "Luxury running sneakers crafted with responsive Boost cushioning."
    },

    {
      image:
        "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1200&auto=format&fit=crop",
      name: "Puma RS-X",
      price: "$280",
      description:
        "Bold designer sneakers inspired by retro streetwear culture."
    }
  ];

  return (

    <section className="bg-[#f3f3f3] min-h-screen pb-20">

      {/* HERO */}

      <div className="relative h-[520px] overflow-hidden rounded-b-[50px]">

        <img
          src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1800&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70"></div>

        {/* BACK BUTTON */}

        <Link
          to="/mainhome"
          className="absolute top-8 left-6 lg:left-16 z-20 w-[52px] h-[52px] rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-black transition duration-300 shadow-lg"
        >

          <ArrowLeft size={22} />

        </Link>

        {/* HERO CONTENT */}

        <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-16">

          <p className="text-[#d7e5d0] tracking-[4px] text-[12px] font-bold">

            BRAND_SHOE PREMIUM COLLECTION

          </p>

          <h1 className="text-white text-[65px] lg:text-[95px] leading-[88%] font-black tracking-[-6px] mt-5">

            LUXURY
            <br />
            COLLECTIONS

          </h1>

          <p className="text-gray-200 text-[16px] leading-[32px] mt-7 max-w-[720px]">

            Discover world-class luxury sneakers inspired by elite fashion.

          </p>

        </div>

      </div>

      {/* TOP BUTTONS */}

      <div className="flex flex-wrap gap-4 px-6 lg:px-16 mt-12">

        {/* ACTIVE */}

        <Link
          to="/collections"
          className="h-[54px] px-8 rounded-full bg-[#8da27f] text-white font-bold tracking-[2px] text-[12px] flex items-center gap-2 shadow-lg"
        >

          <Sparkles size={18} />

          NEW COLLECTIONS

        </Link>

        {/* MOST SOLD */}

        <Link
          to="/mostsold"
          className="h-[54px] px-8 rounded-full bg-white text-black font-bold tracking-[2px] text-[12px] flex items-center gap-2 shadow-md hover:bg-black hover:text-white transition"
        >

          <Flame size={18} />

          MOST SOLD

        </Link>

        {/* OFFERS */}

        <Link
          to="/offers"
          className="h-[54px] px-8 rounded-full bg-white text-black font-bold tracking-[2px] text-[12px] flex items-center gap-2 shadow-md hover:bg-black hover:text-white transition"
        >

          <Tag size={18} />

          OFFERS

        </Link>

      </div>

      {/* PRODUCTS */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-16 py-16">

        {shoes.map((shoe, index) => (

          <div
            key={index}
            className="bg-white rounded-[34px] overflow-hidden shadow-xl"
          >

            <div className="relative h-[300px] overflow-hidden">

              <img
                src={shoe.image}
                alt=""
                className="w-full h-full object-cover hover:scale-110 transition duration-700"
              />

              <button className="absolute top-5 right-5 w-[44px] h-[44px] rounded-full bg-white flex items-center justify-center shadow-lg">

                <Heart size={18} />

              </button>

            </div>

            <div className="p-6">

              <h1 className="text-[28px] font-black">

                {shoe.name}

              </h1>

              <p className="text-gray-500 text-[14px] leading-[28px] mt-4">

                {shoe.description}

              </p>

              <div className="flex items-center justify-between mt-7">

                <h2 className="text-[30px] font-black">

                  {shoe.price}

                </h2>

                <button className="h-[48px] px-6 rounded-full bg-black text-white text-[11px] font-bold tracking-[2px] hover:bg-[#8da27f] transition">

                  BUY NOW

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}