// Footer.jsx

import { Link } from "react-router-dom";

export default function Footer() {

  return (

    <footer className="bg-black py-14 px-6 text-center">

      <h1 className="text-white text-[40px] font-black tracking-[-3px]">

        BRAND_SHOE

      </h1>

      <div className="flex flex-wrap justify-center gap-10 mt-8 text-gray-400 text-[14px]">

        <Link to="/login">Authenticity</Link>
        <Link to="/login">Returns</Link>
        <Link to="/login">Privacy</Link>
        <Link to="/login">Global Access</Link>

      </div>

      <div className="w-full h-[1px] bg-white/10 mt-10"></div>

      <p className="text-gray-500 text-[13px] mt-8">

        © 2026 BRAND_SHOE. All Rights Reserved.

      </p>

    </footer>

  );

}