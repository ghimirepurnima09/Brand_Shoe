import Shoe1 from "../assets/Shoe1.png";

import {
  ShoppingCart
} from "lucide-react";

export default function Hero() {

  return (

    <section className="bg-[#f2f2f2] overflow-hidden">

      <div className="max-w-[1180px] mx-auto min-h-[640px] px-6 flex flex-col lg:flex-row items-center justify-between relative">

        {/* LEFT */}

        <div className="max-w-[500px] z-10 pt-16 lg:pt-0">

          <span className="bg-[#b91c1c] text-white text-[10px] uppercase tracking-[2px] font-bold px-4 py-2 rounded-full shadow-md">

            LIMITED RELEASE

          </span>

          <h1 className="text-[58px] md:text-[70px] leading-[62px] md:leading-[74px] font-black tracking-[-4px] mt-7">

            Luxury in
            <br />
            Every Step

          </h1>

          <p className="text-gray-500 text-[15px] leading-[30px] mt-7 max-w-[460px]">

            Precision-crafted sneakers blending luxury fashion,
            elite comfort, and futuristic streetwear aesthetics.

          </p>

          {/* BUTTONS */}

          <div className="flex items-center gap-4 mt-10 flex-wrap">

            <button className="bg-black text-white px-7 py-3 rounded-full text-[12px] tracking-[2px] font-semibold hover:bg-[#222] transition-all duration-300 flex items-center gap-3 shadow-xl">

              <ShoppingCart size={16} />

              ADD TO CART

            </button>

            <button className="border border-black px-7 py-3 rounded-full text-[12px] tracking-[2px] font-semibold hover:bg-black hover:text-white transition-all duration-300">

              VIEW DETAILS

            </button>

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative z-10 mt-16 lg:mt-0">

          <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-[34px] p-8 shadow-[0_20px_70px_rgba(0,0,0,0.18)] hover:translate-y-[-10px] transition duration-500">

            <img
              src={Shoe1}
              alt=""
              className="w-[430px] md:w-[520px] drop-shadow-[0_45px_35px_rgba(0,0,0,0.35)]"
            />

          </div>

        </div>

        {/* BACKGROUND SHOE */}

        <img
          src={Shoe1}
          alt=""
          className="absolute w-[900px] opacity-[0.10] right-[-120px] top-[20px] blur-[1px]"
        />

      </div>

    </section>

  );

}