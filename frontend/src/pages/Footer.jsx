import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const handleProtectedLink = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/mainhome");
    } else {
      navigate("/login");
    }
  };

  return (
    <footer className="bg-black py-12 px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">

        {/* LOGO */}
        <h1 className="text-white text-center text-[34px] lg:text-[42px] font-black tracking-[-3px]">
          BRAND_SHOE
        </h1>

        {/* LINKS */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-10 mt-7 text-gray-400 text-[13px] lg:text-[14px] font-medium">

          <button
            onClick={handleProtectedLink}
            className="hover:text-[#8da27f] transition duration-300 bg-transparent border-none cursor-pointer"
          >
            Authenticity
          </button>

          <button
            onClick={handleProtectedLink}
            className="hover:text-[#8da27f] transition duration-300 bg-transparent border-none cursor-pointer"
          >
            Returns
          </button>

          <button
            onClick={handleProtectedLink}
            className="hover:text-[#8da27f] transition duration-300 bg-transparent border-none cursor-pointer"
          >
            Privacy
          </button>

          <button
            onClick={handleProtectedLink}
            className="hover:text-[#8da27f] transition duration-300 bg-transparent border-none cursor-pointer"
          >
            Global Access
          </button>

          {/* About Us — always accessible, no login needed */}
          <Link to="/aboutus" className="hover:text-[#8da27f] transition duration-300">
            About Us
          </Link>

        </div>

        {/* LINE */}
        <div className="w-full h-[1px] bg-white/10 mt-8"></div>

        {/* COPYRIGHT */}
        <p className="text-gray-500 text-[12px] lg:text-[13px] text-center mt-6">
          © 2026 BRAND_SHOE. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}