

import { Link } from "react-router-dom";

import Shoe1 from "../assets/Shoe1.png";

export default function Hero() {

  return (

    <section className="relative min-h-[88vh] overflow-hidden bg-black">

      {/* BACKGROUND */}

      <img
        src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1600&auto=format&fit=crop"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-black/65"></div>

      {/* CONTENT */}

      <div className="relative z-10 grid lg:grid-cols-2 items-center min-h-[88vh] px-6 lg:px-16">

        {/* LEFT */}

        <div className="max-w-[580px]">

          <p className="text-white/70 tracking-[4px] text-[11px] font-semibold uppercase">

            Premium Sneaker Collection

          </p>

          {/* ANIMATED TITLE */}

          <h1 className="text-white text-[56px] lg:text-[78px] leading-[95%] font-black tracking-[-5px] mt-4 animate-pulse">

            LUXURY
            <br />
            IN EVERY
            <br />

            <span className="text-[#8da27f]">

              STEP

            </span>

          </h1>

          {/* PROFESSIONAL TEXT */}

          <p className="text-gray-300 text-[16px] leading-[28px] mt-6 max-w-[520px]">

            Discover high-end sneaker collections designed to blend luxury craftsmanship, urban performance, and timeless streetwear identity.

          </p>

          {/* BUTTONS */}

          <div className="flex gap-4 mt-8">

            <Link
              to="/login"
              className="px-8 h-[54px] rounded-full bg-[#8da27f] text-white flex items-center justify-center font-semibold hover:bg-white hover:text-black transition duration-300 shadow-lg"
            >

              SHOP NOW →

            </Link>

            <button className="px-8 h-[54px] rounded-full border border-white text-white font-semibold hover:bg-white hover:text-black transition duration-300">

              EXPLORE

            </button>

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative flex items-center justify-center mt-10 lg:mt-0">

          {/* GLOW */}

          <div className="absolute w-[430px] h-[430px] bg-[#8da27f]/20 rounded-full blur-3xl"></div>

          {/* SHOE */}

          <img
            src={Shoe1}
            alt=""
            className="relative z-10 w-[540px] lg:w-[600px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)] hover:scale-105 transition duration-700"
          />

        </div>

      </div>

    </section>

  );

}