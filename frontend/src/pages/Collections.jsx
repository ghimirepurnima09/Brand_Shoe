const bigImage =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff";

const topRightImage =
  "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519";

export default function Collections() {

  return (

    <section className="bg-black py-20">

      <div className="max-w-[1450px] mx-auto px-12">

        {/* TITLE */}

        <h1 className="text-white text-[58px] font-black mb-10 tracking-[-2px]">

          COLLECTIONS

        </h1>

        {/* GRID */}

        <div className="grid grid-cols-[2fr_1fr] gap-6">

          {/* LEFT BIG CARD */}

          <div
            className="relative h-[700px] bg-cover bg-center overflow-hidden"
            style={{
              backgroundImage: `url(${bigImage})`
            }}
          >

            <div className="absolute inset-0 bg-black/45"></div>

            <div className="absolute bottom-10 left-10 z-10">

              <p className="text-gray-300 text-[13px] tracking-[3px] uppercase">

                Spring 2026

              </p>

              <h2 className="text-white text-[58px] font-black leading-[60px] mt-4">

                THE NOIR SERIES

              </h2>

              <button className="mt-8 border border-white text-white px-10 py-4 uppercase tracking-[2px] text-[12px] hover:bg-white hover:text-black transition">

                Explore Now

              </button>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="flex flex-col gap-6">

            {/* TOP CARD */}

            <div
              className="relative h-[337px] bg-cover bg-center overflow-hidden"
              style={{
                backgroundImage: `url(${topRightImage})`
              }}
            >

              <div className="absolute inset-0 bg-black/45"></div>

              <h2 className="absolute top-10 left-10 text-white text-[42px] font-black tracking-[-1px]">

                HERITAGE

              </h2>

            </div>

            {/* BOTTOM RED CARD */}

            <div className="bg-[#991b1b] h-[337px] flex flex-col justify-center px-12">

              <h2 className="text-white text-[42px] font-black leading-[45px]">

                ARCHIVE DROPS

              </h2>

              <p className="text-gray-200 mt-5 text-[16px] leading-8">

                Access legendary silhouettes from the vault.

              </p>

              <button className="mt-8 text-white text-[40px] w-fit hover:translate-x-2 transition">

                →
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}