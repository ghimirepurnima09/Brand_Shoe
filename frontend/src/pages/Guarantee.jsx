import { ShieldCheck } from "lucide-react";

export default function Guarantee() {

  return (

    <section className="bg-[#f3f3f3] py-20">

      <div className="max-w-[1280px] mx-auto px-10">

        <div className="bg-[#efefef] py-24 text-center">

          <ShieldCheck
            size={42}
            className="mx-auto mb-8"
          />

          <h1 className="text-[58px] font-black tracking-[-2px]">

            EVERY PAIR GUARANTEED

          </h1>

          <p className="text-gray-500 mt-5 text-[17px] max-w-[700px] mx-auto leading-8">

            Our multi-point verification process ensures every item in our marketplace
            is 100% authentic. No exceptions. No compromise.

          </p>

          <div className="flex justify-center gap-5 mt-12">

            <button className="bg-white px-10 py-4 uppercase text-[12px] tracking-[2px] font-semibold">

              JOIN THE INSIDE

            </button>

            <button className="bg-black text-white px-10 py-4 uppercase text-[12px] tracking-[2px] font-semibold">

              GET ACCESS

            </button>

          </div>

        </div>

      </div>

    </section>

  );

}