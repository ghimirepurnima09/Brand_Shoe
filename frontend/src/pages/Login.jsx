import { useState } from "react";

import {
  Eye,
  EyeOff,
  Mail,
  Lock
} from "lucide-react";

import { Link } from "react-router-dom";

import Shoe6 from "../assets/Shoe6.png";
import logo from "../assets/logo.png";

export default function Login() {

  const [showPassword, setShowPassword] = useState(false);

  return (

    <section className="min-h-screen bg-[#ececec] flex overflow-hidden">

      {/* LEFT */}

      <div className="hidden lg:flex flex-1 bg-black relative items-center justify-center overflow-hidden">

        {/* LOGO */}

        <div className="absolute top-6 left-6 z-20">

          <img
            src={logo}
            alt=""
            className="w-[48px] h-[48px] rounded-full object-cover border border-white/20 shadow-lg"
          />

        </div>

        {/* GLOW */}

        <div className="absolute w-[650px] h-[650px] bg-white/10 rounded-full blur-3xl"></div>

        {/* RED LIGHT */}

        <div className="absolute bottom-[-60px] w-[380px] h-[180px] bg-red-600/20 blur-3xl rounded-full"></div>

        {/* SHOE */}

        <img
          src={Shoe6}
          alt=""
          className="w-[520px] z-10 drop-shadow-[0_35px_35px_rgba(255,255,255,0.18)] hover:scale-105 transition duration-700"
        />

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>

      </div>

      {/* RIGHT */}

      <div className="flex-1 bg-[#ececec] flex items-center justify-center px-5">

        <div className="w-full max-w-[360px]">

          <h1 className="text-[40px] leading-[42px] font-black tracking-[-2px] text-black">

            Welcome back.

          </h1>

          <p className="text-gray-500 text-[14px] mt-3">

            Authenticate your identity to access the drops.

          </p>

          {/* FORM */}

          <div className="mt-10">

            {/* EMAIL */}

            <div>

              <label className="text-[11px] tracking-[2px] text-gray-500 font-bold">

                EMAIL ADDRESS

              </label>

              <div className="mt-2 bg-[#ececec] border border-gray-300 rounded-[10px] h-[54px] px-4 flex items-center gap-3 shadow-sm">

                <Mail
                  size={16}
                  className="text-gray-400"
                />

                <input
                  type="email"
                  placeholder="name@domain.com"
                  className="bg-transparent outline-none w-full text-[15px]"
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div className="mt-6">

              <div className="flex justify-between items-center">

                <label className="text-[11px] tracking-[2px] text-gray-500 font-bold">

                  PASSWORD

                </label>

                <button className="text-[11px] font-bold text-gray-500 hover:text-black transition">

                  FORGOT?

                </button>

              </div>

              <div className="mt-2 bg-[#ececec] border border-gray-300 rounded-[10px] h-[54px] px-4 flex items-center gap-3 shadow-sm">

                <Lock
                  size={16}
                  className="text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-transparent outline-none w-full text-[15px]"
                />

                <button
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  className="text-gray-400 hover:text-black transition"
                >

                  {showPassword ? (

                    <EyeOff size={18} />

                  ) : (

                    <Eye size={18} />

                  )}

                </button>

              </div>

            </div>

            {/* SIGN IN */}

            <button className="w-full h-[54px] bg-[#c8161d] text-white rounded-[10px] mt-8 text-[13px] tracking-[3px] font-bold hover:bg-black transition duration-300 shadow-lg">

              SIGN IN

            </button>

            {/* REGISTER */}

            <p className="text-center text-gray-500 text-[13px] mt-10">

              Don’t have Account?

              <Link
                to="/register"
                className="text-black font-semibold ml-2 hover:text-[#c8161d] transition"
              >

                Register

              </Link>

            </p>

          </div>

        </div>

      </div>

    </section>

  );

}