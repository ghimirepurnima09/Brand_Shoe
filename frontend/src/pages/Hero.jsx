import Shoe1 from "../assets/Shoe1.png";

export default function Hero() {

  return (

    <section className="bg-[#f3f3f3]">

      <div className="max-w-[1280px] mx-auto min-h-[620px] px-10 flex items-center justify-between relative overflow-hidden">

        {/* LEFT */}

        <div className="max-w-[480px] z-10">

          <span className="bg-[#b91c1c] text-white text-[11px] tracking-[2px] font-bold px-4 py-2 uppercase">

            Limited Release

          </span>

          <h1 className="text-[58px] leading-[62px] font-black mt-8 tracking-[-4px]">

            Luxury in
            <br />
            Every Step

          </h1>

          <p className="text-gray-500 text-[17px] leading-[34px] mt-8">

            Precision-tuned for peak performance and unparalleled street aesthetic.
            Experience the next evolution of footwear technology.

          </p>

          <div className="flex items-center gap-4 mt-10">

            <button className="bg-black text-white px-9 py-4 rounded-md uppercase text-[12px] tracking-[2px] font-bold hover:bg-[#222] transition">

              SHOP NOW

            </button>

            <button className="border border-black px-9 py-4 rounded-md uppercase text-[12px] tracking-[2px] font-bold hover:bg-black hover:text-white transition">

              VIEW DETAILS

            </button>

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative z-10">

          <div className="bg-white p-12 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">

            <img
              src={Shoe1}
              alt=""
              className="w-[400px]"
            />

          </div>

        </div>

        {/* BACKGROUND */}

        <img
          src={Shoe1}
          alt=""
          className="absolute w-[820px] opacity-[0.03] left-[250px]"
        />

      </div>

    </section>

  );

}