// OffersPage.jsx

import { Link } from "react-router-dom";

import {
  Heart,
  Tag
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
    },

    {
      image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1200&auto=format&fit=crop",
      name: "Puma Velocity Pro",
      oldPrice: "$340",
      newPrice: "$270",
      offer: "15% OFF"
    },

    {
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop",
      name: "Jordan Velocity X",
      oldPrice: "$470",
      newPrice: "$390",
      offer: "22% OFF"
    },

    {
      image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1200&auto=format&fit=crop",
      name: "Nike Crimson Air",
      oldPrice: "$520",
      newPrice: "$420",
      offer: "25% OFF"
    },

    {
      image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1200&auto=format&fit=crop",
      name: "Jordan Midnight Pro",
      oldPrice: "$500",
      newPrice: "$410",
      offer: "19% OFF"
    },

    {
      image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1200&auto=format&fit=crop",
      name: "Adidas Galaxy Boost",
      oldPrice: "$430",
      newPrice: "$360",
      offer: "16% OFF"
    },

    {
      image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=1200&auto=format&fit=crop",
      name: "Puma Neon Runner",
      oldPrice: "$350",
      newPrice: "$280",
      offer: "14% OFF"
    },

    {
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1200&auto=format&fit=crop",
      name: "Nike Phantom Edge",
      oldPrice: "$450",
      newPrice: "$370",
      offer: "20% OFF"
    },

    {
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1200&auto=format&fit=crop",
      name: "Adidas Future X",
      oldPrice: "$380",
      newPrice: "$315",
      offer: "17% OFF"
    },

    {
      image: "https://images.unsplash.com/photo-1608667508764-33cf0726b13a?q=80&w=1200&auto=format&fit=crop",
      name: "Jordan Royal Impact",
      oldPrice: "$560",
      newPrice: "$450",
      offer: "24% OFF"
    },

    {
      image: "https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1200&auto=format&fit=crop",
      name: "Nike Street Nova",
      oldPrice: "$390",
      newPrice: "$300",
      offer: "21% OFF"
    },

    {
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1200&auto=format&fit=crop",
      name: "Puma Velocity Drift",
      oldPrice: "$360",
      newPrice: "$290",
      offer: "16% OFF"
    },

    {
      image: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=1200&auto=format&fit=crop",
      name: "Nike Ice Runner",
      oldPrice: "$490",
      newPrice: "$395",
      offer: "23% OFF"
    },

    {
      image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop",
      name: "Jordan Skyline Pro",
      oldPrice: "$430",
      newPrice: "$355",
      offer: "18% OFF"
    }

  ];

  return (

    <section className="bg-[#f5f5f5] min-h-screen px-6 lg:px-16 py-14">

      {/* TITLE */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-[#8da27f] tracking-[4px] text-[12px] font-bold">

            LIMITED PREMIUM OFFERS

          </p>

          <h1 className="text-[60px] leading-[90%] font-black tracking-[-5px] mt-4">

            EXCLUSIVE
            <br />
            DISCOUNTS

          </h1>

        </div>

        <Link
          to="/collections"
          className="h-[54px] px-8 rounded-full bg-black text-white flex items-center justify-center font-bold tracking-[2px]"
        >

          BACK

        </Link>

      </div>

      {/* PRODUCTS */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

        {offers.map((shoe, index) => (

          <div
            key={index}
            className="bg-white rounded-[34px] overflow-hidden shadow-xl hover:-translate-y-2 transition duration-500"
          >

            {/* IMAGE */}

            <div className="relative h-[290px] overflow-hidden">

              <img
                src={shoe.image}
                alt=""
                className="w-full h-full object-cover hover:scale-110 transition duration-700"
              />

              {/* OFFER BADGE */}

              <div className="absolute top-5 left-5 bg-[#8da27f] text-white px-5 py-2 rounded-full text-[11px] tracking-[2px] font-bold flex items-center gap-2">

                <Tag size={14} />

                {shoe.offer}

              </div>

              {/* WISHLIST */}

              <button className="absolute top-5 right-5 w-[42px] h-[42px] rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-black hover:text-white transition">

                <Heart size={18} />

              </button>

            </div>

            {/* CONTENT */}

            <div className="p-6">

              <h1 className="text-[28px] font-black tracking-[-2px]">

                {shoe.name}

              </h1>

              <p className="text-gray-500 text-[14px] leading-[28px] mt-4">

                Premium luxury sneakers crafted with elite comfort,
                iconic streetwear aesthetics, and modern performance design.

              </p>

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