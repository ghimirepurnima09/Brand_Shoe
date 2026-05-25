const bigImage =
  "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1200&auto=format&fit=crop";

const topRightImage =
  "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1200&auto=format&fit=crop";

export default function Collections() {

  return (

    <section className="bg-[#050505] py-20 overflow-hidden">

      <div className="max-w-[1180px] mx-auto px-6">

        {/* TITLE */}

        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">

          <div>

            <p className="text-gray-500 uppercase tracking-[3px] text-[11px]">

              Luxury Campaign

            </p>

            <h1 className="text-white text-[44px] md:text-[50px] font-black tracking-[-2px] mt-3">

              COLLECTIONS

            </h1>

          </div>

          <button className="border border-gray-600 text-white px-7 py-3 rounded-full text-[12px] tracking-[2px] hover:bg-white hover:text-black transition">

            VIEW ALL

          </button>

        </div>

        {/* GRID */}

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">

          {/* LEFT BIG CARD */}

          <div
            className="relative h-[520px] rounded-[30px] overflow-hidden bg-cover bg-center group"
            style={{
              backgroundImage: `url(${bigImage})`
            }}
          >

            <div className="absolute inset-0 bg-black/60"></div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

            <div className="absolute bottom-10 left-10 z-10">

              <p className="text-gray-300 uppercase tracking-[3px] text-[11px]">

                SPRING 2026

              </p>

              <h2 className="text-white text-[46px] md:text-[54px] leading-[50px] md:leading-[56px] font-black mt-4 tracking-[-2px]">

                THE NOIR
                <br />
                SERIES

              </h2>

              <button className="mt-7 border border-white text-white px-8 py-3 rounded-full text-[12px] tracking-[2px] hover:bg-white hover:text-black transition duration-300">

                EXPLORE NOW

              </button>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="flex flex-col gap-6">

            {/* TOP */}

            <div
              className="relative h-[247px] rounded-[30px] overflow-hidden bg-cover bg-center"
              style={{
                backgroundImage: `url(${topRightImage})`
              }}
            >

              <div className="absolute inset-0 bg-black/60"></div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>

              <h2 className="absolute bottom-8 left-8 text-white text-[34px] md:text-[40px] font-black tracking-[-1px]">

                HERITAGE

              </h2>

            </div>

            {/* BOTTOM */}

            <div className="bg-gradient-to-br from-[#5e0b0b] to-[#1a1a1a] rounded-[30px] h-[247px] p-10 flex flex-col justify-center shadow-[0_20px_50px_rgba(0,0,0,0.35)]">

              <p className="text-gray-300 uppercase tracking-[3px] text-[11px]">

                Limited Vault

              </p>

              <h2 className="text-white text-[34px] md:text-[40px] leading-[42px] font-black mt-4 tracking-[-1px]">

                ARCHIVE
                <br />
                DROPS

              </h2>

              <p className="text-gray-300 text-[14px] leading-7 mt-5 max-w-[260px]">

                Access legendary silhouettes from exclusive sneaker archives.

              </p>

              <button className="mt-7 bg-white text-black px-6 py-3 rounded-full text-[12px] tracking-[2px] font-semibold w-fit hover:bg-black hover:text-white transition">

                DISCOVER

              </button>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}