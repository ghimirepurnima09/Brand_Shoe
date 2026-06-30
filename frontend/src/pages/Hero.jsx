import { useNavigate } from "react-router-dom";
import Shoe1 from "../assets/Shoe1.png";

export default function Hero() {
  const navigate = useNavigate();

  const handleShopNow = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/collections");
    } else {
      navigate("/login");
    }
  };

  const handleExplore = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/aboutus");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">

      {/* BACKGROUND */}
      <img
        src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1600&auto=format&fit=crop"
        alt=""
        className="absolute inset-0 w-full h-full object-cover scale-110"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* EXTRA SHADOW */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20"></div>

      {/* CONTENT */}
      <div className="relative z-10 grid lg:grid-cols-2 items-center min-h-screen px-6 lg:px-16 pt-[40px] pb-[40px]">

        {/* LEFT */}
        <div className="max-w-[580px]">

          <p className="text-white/70 tracking-[4px] text-[11px] font-semibold uppercase">
            Premium Sneaker Collection
          </p>

          {/* TITLE */}
          <h1 className="text-white text-[62px] lg:text-[92px] leading-[88%] font-black tracking-[-6px] mt-5">
            LUXURY
            <br />
            IN EVERY
            <br />
            <span className="text-[#8da27f]">STEP</span>
          </h1>

          {/* TEXT */}
          <p className="text-gray-300 text-[17px] leading-[32px] mt-8 max-w-[540px]">
            Discover high-end sneaker collections designed to blend luxury craftsmanship, urban performance, and timeless streetwear identity.
          </p>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-10">

            <button
              onClick={handleShopNow}
              className="px-9 h-[58px] rounded-full bg-[#8da27f] text-white flex items-center justify-center font-semibold hover:bg-white hover:text-black transition duration-300 shadow-2xl"
            >
              SHOP NOW →
            </button>

            <button
              onClick={handleExplore}
              className="px-9 h-[58px] rounded-full border border-white/60 text-white font-semibold hover:bg-white hover:text-black transition duration-300 backdrop-blur-md flex items-center justify-center"
            >
              EXPLORE
            </button>

          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex items-center justify-center mt-16 lg:mt-0">

          {/* GREEN GLOW */}
          <div className="absolute w-[520px] h-[520px] bg-[#8da27f]/20 rounded-full blur-3xl"></div>

          {/* BLACK SHADOW */}
          <div className="absolute w-[420px] h-[420px] bg-black/60 rounded-full blur-2xl"></div>

          {/* SHOE */}
          <img
            src={Shoe1}
            alt=""
            className="
              relative z-10
              w-[560px]
              lg:w-[720px]
              object-contain
              drop-shadow-[0_45px_45px_rgba(0,0,0,0.9)]
              hover:scale-105
              hover:-rotate-2
              transition-all
              duration-700
            "
          />
        </div>

      </div>
    </section>
  );
}