// MostSoldPage.jsx

import { Link } from "react-router-dom";

import {
  Heart,
  Star
} from "lucide-react";

export default function MostSoldPage() {

  const shoes = [

    {
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
      name: "Nike Retro Elite",
      sold: "28K+ Sold",
      price: "$340"
    },

    {
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop",
      name: "Adidas Prime Boost",
      sold: "22K+ Sold",
      price: "$310"
    },

    {
      image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1200&auto=format&fit=crop",
      name: "Puma Urban Pro",
      sold: "19K+ Sold",
      price: "$270"
    },

    {
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop",
      name: "Jordan Velocity",
      sold: "31K+ Sold",
      price: "$390"
    },

    {
      image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1200&auto=format&fit=crop",
      name: "Nike Crimson Air",
      sold: "34K+ Sold",
      price: "$420"
    },

    {
      image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1200&auto=format&fit=crop",
      name: "Jordan Midnight Pro",
      sold: "29K+ Sold",
      price: "$410"
    },

    {
      image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1200&auto=format&fit=crop",
      name: "Adidas Galaxy Boost",
      sold: "25K+ Sold",
      price: "$360"
    },

    {
      image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=1200&auto=format&fit=crop",
      name: "Puma Neon Runner",
      sold: "18K+ Sold",
      price: "$280"
    },

    {
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1200&auto=format&fit=crop",
      name: "Nike Phantom Edge",
      sold: "26K+ Sold",
      price: "$370"
    },

    {
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1200&auto=format&fit=crop",
      name: "Adidas Future X",
      sold: "20K+ Sold",
      price: "$315"
    },

    {
      image: "https://images.unsplash.com/photo-1608667508764-33cf0726b13a?q=80&w=1200&auto=format&fit=crop",
      name: "Jordan Royal Impact",
      sold: "32K+ Sold",
      price: "$450"
    },

    {
      image: "https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1200&auto=format&fit=crop",
      name: "Nike Street Nova",
      sold: "21K+ Sold",
      price: "$300"
    },

    {
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1200&auto=format&fit=crop",
      name: "Puma Velocity Drift",
      sold: "17K+ Sold",
      price: "$290"
    },

    {
      image: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=1200&auto=format&fit=crop",
      name: "Nike Ice Runner",
      sold: "30K+ Sold",
      price: "$395"
    },

    {
      image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop",
      name: "Jordan Skyline Pro",
      sold: "24K+ Sold",
      price: "$355"
    }

  ];

  return (

    <section className="bg-[#f5f5f5] min-h-screen px-6 lg:px-16 py-14">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-[#8da27f] tracking-[4px] text-[12px] font-bold">

            TOP SELLING COLLECTION

          </p>

          <h1 className="text-[60px] leading-[90%] font-black tracking-[-5px] mt-4">

            MOST SOLD
            <br />
            SNEAKERS

          </h1>

        </div>

        <Link
          to="/collections"
          className="h-[54px] px-8 rounded-full bg-black text-white flex items-center justify-center font-bold tracking-[2px]"
        >

          BACK

        </Link>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

        {shoes.map((shoe, index) => (

          <div
            key={index}
            className="bg-white rounded-[34px] overflow-hidden shadow-xl hover:-translate-y-2 transition duration-500"
          >

            <div className="relative h-[290px] overflow-hidden">

              <img
                src={shoe.image}
                alt=""
                className="w-full h-full object-cover hover:scale-110 transition duration-700"
              />

              <button className="absolute top-5 right-5 w-[42px] h-[42px] rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-black hover:text-white transition">

                <Heart size={18} />

              </button>

            </div>

            <div className="p-6">

              <div className="flex items-center gap-1 text-[#ffb300]">

                <Star size={18} fill="#ffb300" />
                <Star size={18} fill="#ffb300" />
                <Star size={18} fill="#ffb300" />
                <Star size={18} fill="#ffb300" />
                <Star size={18} fill="#ffb300" />

              </div>

              <h1 className="text-[28px] font-black tracking-[-2px] mt-4">

                {shoe.name}

              </h1>

              <p className="text-gray-500 mt-3 text-[14px]">

                {shoe.sold}

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