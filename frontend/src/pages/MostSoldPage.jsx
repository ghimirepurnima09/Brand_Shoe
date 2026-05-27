// MostSoldPage.jsx

import { Link } from "react-router-dom";

import {
  Heart,
  Star
} from "lucide-react";

export default function MostSoldPage() {

  const shoes = [

    {
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
      name: "Nike Retro Elite",
      sold: "28K+ Sold Worldwide",
      price: "$340",
      description:
        "Premium luxury sneaker crafted for elite streetwear styling and modern performance comfort."
    },

    {
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop",
      name: "Adidas Prime Boost",
      sold: "22K+ Sold Worldwide",
      price: "$310",
      description:
        "Modern performance sneakers featuring lightweight cushioning and iconic urban design."
    },

    {
      image:
        "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1200&auto=format&fit=crop",
      name: "Puma Urban Pro",
      sold: "19K+ Sold Worldwide",
      price: "$270",
      description:
        "Futuristic luxury sneakers inspired by bold fashion culture and everyday comfort."
    },

    {
      image:
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop",
      name: "Jordan Velocity",
      sold: "31K+ Sold Worldwide",
      price: "$390",
      description:
        "Elite basketball-inspired sneakers with premium layered detailing and responsive cushioning."
    },

    {
      image:
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop",
      name: "Converse Lift Pro",
      sold: "17K+ Sold Worldwide",
      price: "$240",
      description:
        "Timeless streetwear sneakers built with luxury materials and premium comfort support."
    },

    {
      image:
        "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=1200&auto=format&fit=crop",
      name: "Nike Noir Shadow",
      sold: "20K+ Sold Worldwide",
      price: "$350",
      description:
        "Elegant black luxury sneakers designed with futuristic style and superior comfort."
    },

    {
      image:
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1200&auto=format&fit=crop",
      name: "Puma Velocity Max",
      sold: "24K+ Sold Worldwide",
      price: "$295",
      description:
        "Performance-focused sneakers engineered with lightweight comfort and premium street fashion."
    },

    {
      image:
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1200&auto=format&fit=crop",
      name: "Nike Lunar Drift",
      sold: "26K+ Sold Worldwide",
      price: "$370",
      description:
        "Luxury sneaker collection crafted for modern fashion lovers and sneaker enthusiasts."
    },

    {
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop",
      name: "Adidas Street Prime",
      sold: "18K+ Sold Worldwide",
      price: "$280",
      description:
        "Premium urban sneakers featuring elegant structure and superior everyday performance."
    }

  ];

  return (

    <section className="bg-[#f5f5f5] min-h-screen px-6 lg:px-16 py-14">

      {/* TOP SECTION */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div>

          <p className="text-[#8da27f] tracking-[4px] text-[12px] font-bold uppercase">

            Premium Best Selling Collection

          </p>

          <h1 className="text-[56px] lg:text-[72px] leading-[90%] font-black tracking-[-5px] mt-5 text-black">

            MOST SOLD
            <br />
            SNEAKERS

          </h1>

          <p className="text-gray-500 text-[16px] leading-[30px] mt-6 max-w-[700px]">

            Discover the most demanded premium sneakers loved by thousands
            of sneaker enthusiasts worldwide for their luxury design,
            comfort, and modern streetwear identity.

          </p>

        </div>

        <Link
          to="/collections"
          className="h-[56px] px-8 rounded-full bg-black text-white flex items-center justify-center font-bold tracking-[2px] text-[12px] hover:bg-[#8da27f] transition duration-300 shadow-lg"
        >

          BACK TO COLLECTIONS

        </Link>

      </div>

      {/* PRODUCTS */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

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

              {/* SOLD TAG */}

              <div className="absolute bottom-5 left-5 bg-[#8da27f] text-white px-5 py-2 rounded-full text-[11px] tracking-[2px] font-bold shadow-lg">

                BEST SELLER

              </div>

            </div>

            {/* CONTENT */}

            <div className="p-7">

              {/* STARS */}

              <div className="flex items-center gap-1 text-[#ffb300]">

                <Star size={18} fill="#ffb300" />
                <Star size={18} fill="#ffb300" />
                <Star size={18} fill="#ffb300" />
                <Star size={18} fill="#ffb300" />
                <Star size={18} fill="#ffb300" />

              </div>

              {/* TITLE */}

              <h1 className="text-[30px] font-black tracking-[-2px] mt-4">

                {shoe.name}

              </h1>

              {/* DESCRIPTION */}

              <p className="text-gray-500 text-[14px] leading-[28px] mt-4">

                {shoe.description}

              </p>

              {/* SOLD */}

              <p className="text-[#8da27f] text-[13px] font-bold tracking-[2px] mt-5 uppercase">

                {shoe.sold}

              </p>

              {/* PRICE */}

              <div className="flex items-center justify-between mt-7">

                <h2 className="text-[32px] font-black">

                  {shoe.price}

                </h2>

                <button className="h-[50px] px-7 rounded-full bg-black text-white text-[11px] tracking-[2px] font-bold hover:bg-[#8da27f] transition duration-300 shadow-lg">

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