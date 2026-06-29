import { Link } from "react-router-dom";

const categories = [
  {
    label: "Men",
    tag: "MENS COLLECTION",
    heading: "Built for\nPerformance",
    desc: "Engineered sneakers for every stride — from street to track.",
    link: "/men",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    cta: "Shop Men",
  },
  {
    label: "Women",
    tag: "WOMENS COLLECTION",
    heading: "Style Meets\nComfort",
    desc: "Iconic silhouettes crafted for every occasion, every day.",
    link: "/women",
    img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop",
    cta: "Shop Women",
  },
  {
    label: "Kids",
    tag: "KIDS COLLECTION",
    heading: "Ready to\nExplore",
    desc: "Durable, playful kicks designed to keep up with little legends.",
    link: "/kids",
    img: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1000&auto=format&fit=crop",
    cta: "Shop Kids",
  },
];

export default function Collections() {
  return (
    <section className="bg-black py-24 px-6 lg:px-16">
      {/* Header */}
      <div className="mb-14">
        <p className="text-[#8da27f] tracking-[4px] text-[12px] font-bold uppercase">
          Brand_Shoe
        </p>
        <h2 className="text-white text-[60px] lg:text-[80px] font-black tracking-[-4px] leading-[90%] mt-4">
          SHOP BY
          <br />
          CATEGORY
        </h2>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            to={cat.link}
            className="group relative rounded-[32px] overflow-hidden h-[480px] block"
          >
            {/* Background image */}
            <img
              src={cat.img}
              alt={cat.label}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/600x800?text=" + cat.label;
              }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <p className="text-[#8da27f] tracking-[3px] text-[11px] font-bold uppercase mb-3">
                {cat.tag}
              </p>
              <h3 className="text-white text-[32px] font-black leading-[100%] tracking-[-1px] whitespace-pre-line mb-3">
                {cat.heading}
              </h3>
              <p className="text-gray-300 text-sm leading-[24px] mb-6">
                {cat.desc}
              </p>
              <div className="inline-flex items-center gap-2 w-fit px-6 h-12 rounded-full bg-[#8da27f] text-white text-xs font-bold tracking-[2px] uppercase group-hover:bg-white group-hover:text-black transition duration-300">
                {cat.cta}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="group-hover:translate-x-1 transition"
                >
                  <path
                    d="M1 7h12M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}