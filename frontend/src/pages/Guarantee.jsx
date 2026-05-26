// ==========================
// Guarantee.jsx
// ==========================

import { Link } from "react-router-dom";

import { ShieldCheck } from "lucide-react";

export default function Guarantee() {

  return (

    <section className="py-16 px-6 bg-[#f5f5f5] flex flex-col items-center text-center">

      {/* ICON */}

      <div className="w-[82px] h-[82px] rounded-full bg-white shadow-lg flex items-center justify-center">

        <ShieldCheck
          size={38}
          className="text-[#8da27f]"
        />

      </div>

      {/* TITLE */}

      <h1 className="text-[48px] lg:text-[56px] leading-[95%] font-black tracking-[-3px] text-black mt-7">

        EVERY PAIR
        <br />
        GUARANTEED

      </h1>

      {/* TEXT */}

      <p className="text-gray-600 max-w-[560px] leading-[28px] mt-5 text-[16px]">

        Every sneaker is authenticated and verified before shipping to ensure premium quality and originality.

      </p>

      {/* BUTTON */}

      <div className="flex gap-4 mt-7">

        <Link
          to="/login"
          className="px-8 h-[52px] rounded-full bg-black text-white flex items-center justify-center font-semibold hover:bg-[#8da27f] transition duration-300 shadow-lg"
        >

          Start Shopping

        </Link>

      </div>

    </section>

  );

}