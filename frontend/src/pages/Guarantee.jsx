// Guarantee.jsx

import { Link } from "react-router-dom";

import { ShieldCheck } from "lucide-react";

export default function Guarantee() {

  return (

    <section className="py-24 px-6 bg-[#ededed] flex flex-col items-center text-center">

      <div className="w-[90px] h-[90px] rounded-full bg-white shadow-lg flex items-center justify-center">

        <ShieldCheck
          size={42}
          className="text-[#c8161d]"
        />

      </div>

      <h1 className="text-[54px] font-black tracking-[-3px] text-black mt-8">

        EVERY PAIR
        <br />
        GUARANTEED

      </h1>

      <p className="text-gray-600 max-w-[620px] leading-[34px] mt-6 text-[17px]">

        Every sneaker is authenticated and verified before shipping.

      </p>

      <div className="flex gap-4 mt-10">

        <Link
          to="/login"
          className="px-8 h-[54px] rounded-full bg-black text-white flex items-center justify-center font-semibold"
        >

          Start Shopping

        </Link>

      </div>

    </section>

  );

}