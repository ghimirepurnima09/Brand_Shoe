import Shoe1 from "../assets/Shoe1.png";

export default function Hero() {

  return (

    <section className="bg-[#f5f5f5] px-10 py-20 flex items-center justify-between">

      <div className="max-w-xl">

        <p className="text-sm tracking-[5px] text-gray-500 mb-4">
          BRAND NEW COLLECTION
        </p>

        <h1 className="text-7xl font-black leading-tight text-black">

          STEP INTO <br />
          STYLE

        </h1>

        <p className="text-gray-500 mt-6 text-lg leading-8">

          Discover premium sneakers crafted for comfort,
          performance and luxury fashion.

        </p>

        <div className="flex gap-5 mt-10">

          <button className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition">

            Shop Now

          </button>

          <button className="border border-black px-8 py-4 rounded-full hover:bg-black hover:text-white transition">

            Explore

          </button>

        </div>

      </div>

      <div className="flex justify-center">

        <img
          src={Shoe1}
          alt="shoe"
          className="w-[650px] object-contain"
        />

      </div>

    </section>

  );

}