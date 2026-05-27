// CollectionsPage.jsx

import { Link } from "react-router-dom";
import {
  Sparkles,
  Flame,
  Star,
  Heart
} from "lucide-react";

export default function CollectionsPage() {

  const newCollections = [

    {
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
      name: "Nike Air Max Elite",
      price: "$340",
      description: "Luxury-crafted sneakers with elite cushioning and iconic modern streetwear styling."
    },

    {
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop",
      name: "Adidas Ultraboost Prime",
      price: "$310",
      description: "Premium performance sneakers designed with lightweight comfort and sleek urban aesthetics."
    },

    {
      image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1200&auto=format&fit=crop",
      name: "Puma Future Rider",
      price: "$270",
      description: "Modern luxury sneakers inspired by futuristic comfort and bold fashion identity."
    },

    {
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop",
      name: "Jordan Velocity X",
      price: "$390",
      description: "Elite basketball-inspired sneakers with iconic layered detailing and premium cushioning."
    },

    {
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop",
      name: "Converse Street Lift",
      price: "$240",
      description: "Timeless streetwear sneakers crafted with premium comfort support and urban styling."
    },

    {
      image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=1200&auto=format&fit=crop",
      name: "Nike Noir Shadow",
      price: "$350",
      description: "Elegant black luxury sneakers featuring futuristic design and superior comfort."
    },

    {
      image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1200&auto=format&fit=crop",
      name: "Puma Velocity Max",
      price: "$260",
      description: "Premium sneakers engineered with lightweight structure and elevated sneaker culture styling."
    },

    {
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1200&auto=format&fit=crop",
      name: "Nike Lunar Drift",
      price: "$370",
      description: "Luxury sneaker collection designed for iconic style and all-day premium comfort."
    }

  ];

  return (

    <section className="bg-[#f5f5f5] min-h-screen">

      {/* HERO */}

      <div className="relative h-[500px] overflow-hidden rounded-b-[50px]">

        <img
          src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1800&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-16">

          <p className="text-[#d8e6d1] tracking-[4px] text-[12px] font-bold">

            BRAND_SHOE EXCLUSIVE COLLECTION

          </p>

          <h1 className="text-white text-[62px] lg:text-[92px] leading-[88%] font-black tracking-[-6px] mt-5">

            NEW
            <br />
            COLLECTIONS

          </h1>

          <p className="text-gray-200 text-[16px] leading-[32px] mt-7 max-w-[700px]">

            Discover premium sneaker collections inspired by luxury fashion,
            modern performance engineering, and iconic global streetwear culture.

          </p>

        </div>

      </div>

      {/* TOP BUTTONS */}

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

          <Star size={18} />
          OFFERS

        </Link>

      </div>

      {/* PRODUCTS */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 lg:px-16 py-16">

        {newCollections.map((shoe, index) => (

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

              <button className="absolute top-5 right-5 w-[42px] h-[42px] rounded-full bg-white flex items-center justify-center shadow-lg">

                <Heart size={18} />

              </button>

            </div>

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