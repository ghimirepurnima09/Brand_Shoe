// Hero.jsx

import { Link } from "react-router-dom";

import Shoe1 from "../assets/Shoe1.png";

export default function Hero() {

  return (

    <section className="relative min-h-[92vh] overflow-hidden bg-[#f3f3f3] flex items-center px-6 lg:px-16">

      {/* BLACK SHOE BACKGROUND */}

      <img
        src={Shoe1}
        alt=""
        className="absolute right-[-280px] top-[40px] w-[1100px] opacity-[0.07] rotate-[-18deg] select-none pointer-events-none"
      />

      {/* LIGHT EFFECT */}

      <div className="absolute top-[-120px] right-[-100px] w-[600px] h-[600px] bg-black/5 rounded-full blur-3xl"></div>

      {/* LEFT */}

      <div className="flex-1 relative z-10">

        <p className="text-[#c8161d] font-bold tracking-[4px] text-[13px]">

          LIMITED RELEASE

        </p>

        <h1 className="text-[70px] lg:text-[110px] leading-[88%] font-black tracking-[-7px] text-black mt-6">

          Luxury
          <br />
          in Every
          <br />
          Step

        </h1>

        <p className="text-gray-600 text-[18px] leading-[34px] max-w-[520px] mt-8">

          Premium luxury sneakers inspired by elite streetwear culture and modern fashion aesthetics.

        </p>

        {/* BUTTONS */}

        <div className="flex items-center gap-5 mt-10">

          <Link
            to="/login"
            className="px-9 h-[56px] rounded-full bg-black text-white flex items-center justify-center font-semibold hover:bg-[#c8161d] transition duration-300 shadow-xl"
          >

            Shop Now

          </Link>

          <Link
            to="/login"
            className="px-9 h-[56px] rounded-full border border-black text-black flex items-center justify-center font-semibold hover:bg-black hover:text-white transition duration-300"
          >

            View Details

          </Link>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex-1 relative flex justify-center items-center z-10">

        {/* SHADOW */}

        <div className="absolute bottom-[120px] w-[340px] h-[55px] bg-black/20 blur-2xl rounded-full"></div>

        {/* CARD */}

        <Link
          to="/login"
          className="relative w-[500px] h-[500px] rounded-[38px] bg-white/70 backdrop-blur-xl border border-white shadow-[0_25px_60px_rgba(0,0,0,0.12)] flex items-center justify-center overflow-hidden group"
        >

          {/* CARD LIGHT */}

          <div className="absolute top-[-80px] right-[-60px] w-[240px] h-[240px] bg-white/70 blur-3xl rounded-full"></div>

          {/* SMALL BLACK SHOE BG */}

          <img
            src={Shoe1}
            alt=""
            className="absolute w-[520px] opacity-[0.08] rotate-[-18deg]"
          />

          {/* MAIN SHOE */}

          <img
            src={Shoe1}
            alt=""
            className="relative z-10 w-[500px] rotate-[-18deg] object-contain group-hover:scale-105 transition duration-700 drop-shadow-[0_35px_35px_rgba(0,0,0,0.35)]"
          />

        </Link>

      </div>

    </section>

  );

}