import { Link } from "react-router-dom";

import Shoe1 from "../assets/Shoe1.png";

export default function Collections() {

  return (

    <section className="px-6 lg:px-16 py-24 bg-black">

      <div className="grid lg:grid-cols-2 gap-8">

        {/* LEFT CARD */}

        <Link
          to="/collections"
          className="relative rounded-[36px] overflow-hidden h-[620px] group bg-[#1d1d1d]"
        >

          {/* IMAGE */}

          <img
            src={Shoe1}
            alt=""
            className="absolute inset-0 w-full h-full object-contain p-10 group-hover:scale-105 transition duration-700"
          />

          {/* OVERLAY */}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

          {/* CONTENT */}

          <div className="absolute bottom-10 left-10">

            <p className="text-white/70 tracking-[3px] text-[12px] font-semibold uppercase">

              Spring 2026

            </p>

            <h1 className="text-white text-[62px] leading-[90%] font-black mt-4 tracking-[-4px]">

              THE NOIR
              <br />
              SERIES

            </h1>

          </div>

        </Link>

        {/* RIGHT SIDE */}

        <div className="flex flex-col gap-8">

          {/* MOST SOLD */}

          <Link
            to="/mostsold"
            className="relative rounded-[36px] overflow-hidden h-[295px] group"
          >

            {/* IMAGE */}

            <img
              src="https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1200&auto=format&fit=crop"
              alt=""
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />

            {/* OVERLAY */}

            <div className="absolute inset-0 bg-black/40"></div>

            {/* CONTENT */}

            <div className="absolute bottom-8 left-8">

              <p className="text-white/70 tracking-[3px] text-[11px] uppercase">

                Best Seller

              </p>

              <h1 className="text-white text-[42px] font-black tracking-[-3px] mt-3">

                MOST SOLD

              </h1>

            </div>

          </Link>

          {/* OFFERS */}

          <Link
            to="/offers"
            className="relative rounded-[36px] overflow-hidden h-[295px] bg-[#6f8f62] flex items-center justify-center group"
          >

            {/* HOVER EFFECT */}

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500"></div>

            {/* TEXT */}

            <h1 className="relative z-10 text-white text-[54px] font-black tracking-[-3px] text-center">

              ARCHIVE
              <br />
              DROPS

            </h1>

          </Link>

        </div>

      </div>

    </section>

  );

}