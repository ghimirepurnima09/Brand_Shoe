// CollectionsPage.jsx

import { Link } from "react-router-dom";

import {
  Sparkles,
  Flame,
  Tag,
  Heart
} from "lucide-react";

export default function CollectionsPage() {
    // Replace ONLY the shoes array in CollectionsPage.jsx with this

const shoes = [

  {
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
    name: "Nike Air Max 270",
    price: "$320",
    description:
      "Premium lifestyle sneakers featuring iconic Air cushioning, lightweight comfort, and modern streetwear styling."
  },

  {
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop",
    name: "Adidas Ultraboost 22",
    price: "$340",
    description:
      "Luxury running sneakers crafted with responsive Boost cushioning and sleek modern performance aesthetics."
  },

  {
    image:
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1200&auto=format&fit=crop",
    name: "Puma RS-X",
    price: "$280",
    description:
      "Bold designer sneakers inspired by retro streetwear culture with premium comfort technology."
  },

  {
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop",
    name: "Air Jordan 1 Retro High",
    price: "$520",
    description:
      "Legendary basketball sneakers combining iconic heritage styling with luxurious modern craftsmanship."
  },

  {
    image:
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1200&auto=format&fit=crop",
    name: "Nike Dunk Low",
    price: "$390",
    description:
      "Premium low-top sneakers designed for modern sneaker culture with timeless urban aesthetics."
  },

  {
    image:
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1200&auto=format&fit=crop",
    name: "Air Jordan 4",
    price: "$560",
    description:
      "Luxury performance sneakers featuring iconic layered design and elite basketball-inspired comfort."
  },

  {
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop",
    name: "Converse Chuck Taylor",
    price: "$240",
    description:
      "Classic premium sneakers reimagined with modern comfort and timeless streetwear identity."
  },

  {
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop",
    name: "Nike Air Force 1",
    price: "$410",
    description:
      "Iconic luxury sneakers known for premium leather construction and legendary urban fashion styling."
  },

  {
    image:
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1200&auto=format&fit=crop",
    name: "New Balance 550",
    price: "$300",
    description:
      "Premium retro-inspired sneakers delivering elegant simplicity and modern everyday comfort."
  },

  {
    image:
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1200&auto=format&fit=crop",
    name: "Nike Blazer Mid 77",
    price: "$360",
    description:
      "Vintage-inspired sneakers crafted with premium detailing and modern luxury streetwear appeal."
  },

  {
    image:
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=1200&auto=format&fit=crop",
    name: "Adidas NMD R1",
    price: "$330",
    description:
      "Futuristic sneakers designed with responsive comfort technology and clean urban aesthetics."
  },

  {
    image:
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=1200&auto=format&fit=crop",
    name: "Puma Suede Classic",
    price: "$250",
    description:
      "Luxury suede sneakers blending timeless fashion culture with premium modern comfort."
  },

  {
    image:
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=1200&auto=format&fit=crop",
    name: "Nike React Vision",
    price: "$370",
    description:
      "Modern lifestyle sneakers engineered with lightweight cushioning and futuristic design elements."
  },

  {
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1200&auto=format&fit=crop",
    name: "Vans Old Skool",
    price: "$220",
    description:
      "Classic skate-inspired sneakers crafted with durable premium materials and timeless street styling."
  },

  {
    image:
      "https://images.unsplash.com/photo-1608667508764-33cf0726b13a?q=80&w=1200&auto=format&fit=crop",
    name: "Air Jordan 11",
    price: "$590",
    description:
      "Elite luxury basketball sneakers featuring glossy patent leather and iconic championship heritage."
  }

];
  

  return (

    <section className="bg-[#f3f3f3] min-h-screen pb-20">

      {/* HERO SECTION */}

      <div className="relative h-[520px] overflow-hidden rounded-b-[50px]">

        <img
          src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1800&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70"></div>

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

            Discover world-class luxury sneakers inspired by elite fashion,
            premium comfort engineering, and modern global streetwear culture.

          </p>

        </div>

      </div>

      {/* CATEGORY BUTTONS */}

      <div className="flex flex-wrap gap-4 px-6 lg:px-16 mt-12">

        <button className="h-[54px] px-8 rounded-full bg-[#8da27f] text-white font-bold tracking-[2px] text-[12px] flex items-center gap-2 shadow-lg">

          <Sparkles size={18} />

          NEW COLLECTIONS

        </button>

        <Link
          to="/mostsold"
          className="h-[54px] px-8 rounded-full bg-white text-black font-bold tracking-[2px] text-[12px] flex items-center gap-2 shadow-md hover:bg-black hover:text-white transition"
        >

          <Flame size={18} />

          MOST SOLD

        </Link>

        <Link
          to="/offers"
          className="h-[54px] px-8 rounded-full bg-white text-black font-bold tracking-[2px] text-[12px] flex items-center gap-2 shadow-md hover:bg-black hover:text-white transition"
        >

          <Tag size={18} />

          OFFERS

        </Link>

      </div>

      {/* PRODUCTS */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 lg:px-16 py-16">

        {shoes.map((shoe, index) => (

          <div
            key={index}
            className="bg-white rounded-[34px] overflow-hidden shadow-xl hover:-translate-y-2 transition duration-500"
          >

            {/* IMAGE */}

            <div className="relative h-[300px] overflow-hidden">

              <img
                src={shoe.image}
                alt=""
                className="w-full h-full object-cover hover:scale-110 transition duration-700"
              />

              {/* WISHLIST */}

              <button className="absolute top-5 right-5 w-[44px] h-[44px] rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-black hover:text-white transition">

                <Heart size={18} />

              </button>

            </div>

            {/* CONTENT */}

            <div className="p-6">

              <h1 className="text-[28px] font-black tracking-[-2px]">

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