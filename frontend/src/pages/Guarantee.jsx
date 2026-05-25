import {
  ShieldCheck
} from "lucide-react";

export default function Guarantee() {

  return (

    <section className="bg-[#f8f8f8] py-12">

      <div className="max-w-[850px] mx-auto px-6">

        <div className="bg-[#f1f1f1] rounded-[28px] py-10 px-8 text-center shadow-sm">

          <ShieldCheck
            size={38}
            className="mx-auto"
          />

          <h1 className="text-[34px] font-black tracking-[-2px] mt-6">

            EVERY PAIR GUARANTEED

          </h1>

          <p className="text-gray-500 text-[14px] leading-7 mt-4 max-w-[560px] mx-auto">

            Every sneaker goes through our premium verification
            process to ensure authenticity and elite quality.

          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-7">

            <button className="bg-white px-8 py-3 rounded-full text-[12px] tracking-[2px] font-semibold hover:bg-black hover:text-white transition">

              JOIN THE INSIDE

            </button>

            <button className="bg-black text-white px-8 py-3 rounded-full text-[12px] tracking-[2px] font-semibold hover:bg-red-600 transition">

              GET ACCESS

            </button>

          </div>

        </div>

      </div>

    </section>

  );

}