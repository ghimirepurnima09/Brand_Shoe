// ==============================
// ForgotPassword.jsx
// ==============================

import { Mail, ArrowLeft } from "lucide-react";

import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import Shoe6 from "../assets/Shoe6.png";

export default function ForgotPassword() {

  return (

    <section className="min-h-screen bg-[#f3f3f3] flex overflow-hidden">

      {/* LEFT SIDE */}

      <div className="hidden lg:flex flex-1 bg-black relative items-center justify-center overflow-hidden">

        {/* BACKGROUND */}

        <img
          src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1400&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        {/* LOGO */}

        <div className="absolute top-6 left-6 z-20 flex items-center gap-3">

          <img
            src={logo}
            alt=""
            className="w-[48px] h-[48px] rounded-full object-cover border border-white/20 shadow-lg"
          />

          <h1 className="text-white text-[30px] font-black tracking-[-2px]">

            Brand_Shoe

          </h1>

        </div>

        {/* SHOE */}

        <img
          src={Shoe6}
          alt=""
          className="w-[520px] z-10 drop-shadow-[0_35px_35px_rgba(255,255,255,0.18)] hover:scale-105 transition duration-700"
        />

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/30"></div>

        {/* TEXT */}

        <div className="absolute bottom-14 left-10 z-20">

          <h1 className="text-white text-[58px] leading-[90%] font-black tracking-[-4px]">

            RESET YOUR
            <br />
            PASSWORD
            <br />

            <span className="text-[#8da27f]">

              QUICKLY

            </span>

          </h1>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="flex-1 bg-[#f3f3f3] flex items-center justify-center px-5">

        <div className="w-full max-w-[390px]">

          {/* BACK BUTTON */}

          <Link
            to="/login"
            className="flex items-center gap-2 text-gray-500 hover:text-black transition mb-8"
          >

            <ArrowLeft size={18} />

            Back to Login

          </Link>

          {/* TITLE */}

          <h1 className="text-[48px] leading-[48px] font-black tracking-[-3px] text-black">

            Forgot
            <br />
            Password?

          </h1>

          {/* DESCRIPTION */}

          <p className="text-gray-500 text-[15px] mt-5 leading-[28px]">

            Don’t worry. Enter your registered email address and we’ll send you a password reset link.

          </p>

          {/* FORM */}

          <div className="mt-10">

            {/* EMAIL */}

            <div>

              <label className="text-[11px] tracking-[2px] text-gray-500 font-bold">

                EMAIL ADDRESS

              </label>

              <div className="mt-2 bg-white border border-gray-300 rounded-[14px] h-[58px] px-4 flex items-center gap-3 shadow-sm">

                <Mail
                  size={18}
                  className="text-gray-400"
                />

                <input
                  type="email"
                  placeholder="name@domain.com"
                  className="bg-transparent outline-none w-full text-[15px]"
                />

              </div>

            </div>

            {/* BUTTON */}

            <button
              className="w-full h-[58px] bg-black text-white rounded-[14px] mt-8 text-[13px] tracking-[3px] font-bold hover:bg-[#6f8f62] transition duration-300 shadow-xl"
            >

              SEND RESET LINK

            </button>

            {/* LOGIN */}

            <p className="text-center text-gray-500 text-[14px] mt-10">

              Remember your password?

              <Link
                to="/login"
                className="text-black font-semibold ml-2 hover:text-[#6f8f62] transition"
              >

                Login

              </Link>

            </p>

          </div>

        </div>

      </div>

    </section>

  );

}