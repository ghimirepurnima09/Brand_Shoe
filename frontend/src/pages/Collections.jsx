// Collection.jsx

import { Link } from "react-router-dom";

import Shoe1 from "../assets/Shoe1.png";
import Shoe4 from "../assets/Shoe4.png";

export default function Collection() {

  return (

    <section className="px-6 lg:px-16 py-24 bg-black">

      <div className="grid lg:grid-cols-2 gap-8">

        <Link
          to="/login"
          className="relative rounded-[36px] overflow-hidden h-[620px] group"
        >

          <img
            src={Shoe1}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

          <div className="absolute bottom-10 left-10">

            <p className="text-white/70 tracking-[3px] text-[12px]">

              SPRING 2026

            </p>

            <h1 className="text-white text-[62px] leading-[90%] font-black mt-4 tracking-[-4px]">

              THE NOIR
              <br />
              SERIES

            </h1>

          </div>

        </Link>

        <div className="flex flex-col gap-8">

          <Link
            to="/login"
            className="relative rounded-[36px] overflow-hidden h-[295px]"
          >

            <img
              src={Shoe4}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />

          </Link>

          <Link
            to="/login"
            className="relative rounded-[36px] overflow-hidden h-[295px] bg-[#c8161d] flex items-center justify-center"
          >

            <h1 className="text-white text-[54px] font-black tracking-[-3px]">

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