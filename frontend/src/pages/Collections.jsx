import { Link } from "react-router-dom";
import Shoe1 from "../assets/Shoe1.png";

export default function Collections() {
  return (
    <section className="px-6 lg:px-16 py-24 bg-black min-h-screen">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* LEFT CARD */}
        <Link
          to="/men"
          className="relative rounded-[36px] overflow-hidden h-[620px] group bg-[#1d1d1d]"
        >
          <img
            src={Shoe1}
            alt="Men Collection"
            className="absolute inset-0 w-full h-full object-contain p-10 group-hover:scale-105 transition duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

          <div className="absolute bottom-10 left-10">
            <p className="text-white/70 tracking-[3px] text-[12px] font-semibold uppercase">
              Men's Collection
            </p>

            <h1 className="text-white text-[62px] leading-[90%] font-black mt-4 tracking-[-4px]">
              MEN'S
              <br />
              SHOES
            </h1>
          </div>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-8">
          <Link
            to="/women"
            className="relative rounded-[36px] overflow-hidden h-[295px] group"
          >
            <img
              src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1200&auto=format&fit=crop"
              alt="Women"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />

            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute bottom-8 left-8">
              <p className="text-white/70 tracking-[3px] text-[11px] uppercase">
                Women's Collection
              </p>

              <h1 className="text-white text-[42px] font-black tracking-[-3px] mt-3">
                WOMEN
              </h1>
            </div>
          </Link>

          <Link
            to="/kids"
            className="relative rounded-[36px] overflow-hidden h-[295px] bg-[#6f8f62] flex items-center justify-center"
          >
            <h1 className="text-white text-[54px] font-black tracking-[-3px] text-center">
              KIDS
              <br />
              SHOES
            </h1>
          </Link>
        </div>
      </div>
    </section>
  );
}