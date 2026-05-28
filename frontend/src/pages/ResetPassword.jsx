// ==============================
// ResetPassword.jsx
// ==============================

import { Link, useNavigate } from "react-router-dom";

import {
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck
} from "lucide-react";

import { useState } from "react";

import logo from "../assets/logo.png";

export default function ResetPassword() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleReset = () => {

    alert("Password Reset Successfully!");

    navigate("/login");

  };

  return (

    <section className="min-h-screen bg-[#f3f3f3] flex overflow-hidden">

      {/* LEFT SIDE */}

      <div className="hidden lg:flex flex-1 bg-black relative items-center justify-center overflow-hidden">

        {/* BACKGROUND */}

        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
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

        {/* SHOE IMAGE */}

        <img
          src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1400&auto=format&fit=crop"
          alt=""
          className="w-[650px] z-10 object-contain drop-shadow-[0_35px_35px_rgba(255,255,255,0.12)] hover:scale-105 transition duration-700"
        />

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40"></div>

        {/* TEXT */}

        <div className="absolute bottom-12 left-10 z-20">

          <h1 className="text-white text-[60px] leading-[90%] font-black tracking-[-4px]">

            CREATE
            <br />
            NEW
            <br />

            <span className="text-[#8da27f]">

              PASSWORD

            </span>

          </h1>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="flex-1 bg-[#f3f3f3] flex items-center justify-center px-5">

        <div className="w-full max-w-[390px]">

          {/* BACK */}

          <Link
            to="/forgotpassword"
            className="flex items-center gap-2 text-gray-500 hover:text-black transition mb-7 font-medium"
          >

            <ArrowLeft size={17} />

            Back

          </Link>

          {/* TITLE */}

          <h1 className="text-[46px] leading-[46px] font-black tracking-[-3px] text-black">

            Reset
            <br />
            Password.

          </h1>

          <p className="text-gray-500 text-[15px] mt-4 leading-[28px]">

            Create a strong new password for your Brand_Shoe account.

          </p>

          {/* OTP */}

          <div className="mt-10">

            <label className="text-[11px] tracking-[2px] text-gray-500 font-bold">

              ENTER OTP

            </label>

            <input
              type="text"
              placeholder="Enter OTP"
              className="mt-2 w-full h-[58px] bg-white border border-gray-300 rounded-[14px] px-4 outline-none shadow-sm text-[15px]"
            />

          </div>

          {/* NEW PASSWORD */}

          <div className="mt-6">

            <label className="text-[11px] tracking-[2px] text-gray-500 font-bold">

              NEW PASSWORD

            </label>

            <div className="mt-2 bg-white border border-gray-300 rounded-[14px] h-[58px] px-4 flex items-center gap-3 shadow-sm">

              <Lock
                size={18}
                className="text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="bg-transparent outline-none w-full text-[15px]"
              />

              {
                showPassword ? (

                  <EyeOff
                    size={20}
                    className="text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />

                ) : (

                  <Eye
                    size={20}
                    className="text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />

                )
              }

            </div>

          </div>

          {/* CONFIRM PASSWORD */}

          <div className="mt-6">

            <label className="text-[11px] tracking-[2px] text-gray-500 font-bold">

              CONFIRM PASSWORD

            </label>

            <div className="mt-2 bg-white border border-gray-300 rounded-[14px] h-[58px] px-4 flex items-center gap-3 shadow-sm">

              <Lock
                size={18}
                className="text-gray-400"
              />

              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="bg-transparent outline-none w-full text-[15px]"
              />

              {
                showConfirmPassword ? (

                  <EyeOff
                    size={20}
                    className="text-gray-500 cursor-pointer"
                    onClick={() => setShowConfirmPassword(false)}
                  />

                ) : (

                  <Eye
                    size={20}
                    className="text-gray-500 cursor-pointer"
                    onClick={() => setShowConfirmPassword(true)}
                  />

                )
              }

            </div>

          </div>

          {/* BUTTON */}

          <button
            onClick={handleReset}
            className="w-full h-[58px] bg-black text-white rounded-[14px] mt-8 text-[13px] tracking-[3px] font-bold hover:bg-[#6f8f62] transition duration-300 shadow-xl"
          >

            RESET PASSWORD

          </button>

          {/* SECURITY BOX */}

          <div className="mt-8 bg-white border border-gray-200 rounded-[20px] p-5 shadow-sm flex items-start gap-4">

            <div className="w-[52px] h-[52px] rounded-full bg-[#8da27f]/10 flex items-center justify-center">

              <ShieldCheck
                size={24}
                className="text-[#8da27f]"
              />

            </div>

            <div>

              <h3 className="font-bold text-[16px] text-black">

                Password Security

              </h3>

              <p className="text-gray-500 text-[14px] leading-[24px] mt-1">

                Use at least 8 characters with numbers and symbols for stronger protection.

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}