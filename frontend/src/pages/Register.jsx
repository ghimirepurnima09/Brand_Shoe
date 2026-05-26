import { useState } from "react";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft
} from "lucide-react";

import { Link } from "react-router-dom";

import image from "../assets/image.png";
import logo from "../assets/logo.png";

export default function Register() {

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const hasLength = password.length >= 8;
  const hasSpecial = /[@$!%*?&]/.test(password);
  const hasUpper = /[A-Z]/.test(password);

  const strongPassword =
    hasLength && hasSpecial && hasUpper;

  return (

    <section className="min-h-screen bg-[#efefef] flex flex-col">

      {/* NAVBAR */}

      <nav className="w-full h-[78px] bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-14">

        {/* LEFT */}

        <div className="flex items-center gap-4">

          <img
            src={logo}
            alt=""
            className="w-[46px] h-[46px] rounded-full object-cover shadow-md"
          />

          <h1 className="text-[30px] font-black tracking-[-2px]">

            Brand_Shoe

          </h1>

        </div>

      </nav>

      {/* MAIN */}

      <div className="flex-1 flex items-center justify-center px-5 py-8">

        <div className="w-full max-w-[1280px] grid lg:grid-cols-2 gap-8 items-center">

          {/* LEFT */}

          <div className="relative rounded-[24px] overflow-hidden bg-black h-[560px] shadow-2xl">

            {/* BACK */}

            <Link
              to="/login"
              className="absolute top-5 left-5 z-20 w-[42px] h-[42px] rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition"
            >

              <ArrowLeft size={20} />

            </Link>

            {/* IMAGE */}

            <img
              src={image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-95"
            />

            {/* OVERLAY */}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20"></div>

          </div>

          {/* RIGHT */}

          <div className="px-1 lg:px-4">

            <h1 className="text-[64px] leading-[64px] font-black tracking-[-4px] text-black">

              Join the
              <br />
              Brand_Shoe

            </h1>

            <p className="text-gray-500 text-[18px] mt-4">

              Create your profile to start your collection journey.

            </p>

            {/* FORM */}

            <div className="mt-9 space-y-5">

              {/* NAME */}

              <div>

                <label className="text-[12px] font-bold tracking-[2px] text-gray-500">

                  FULL NAME

                </label>

                <div className="mt-2 h-[58px] rounded-[14px] border border-gray-300 bg-white px-4 flex items-center gap-3 shadow-sm">

                  <User size={18} className="text-gray-400" />

                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full outline-none bg-transparent text-[16px]"
                  />

                </div>

              </div>

              {/* EMAIL */}

              <div>

                <label className="text-[12px] font-bold tracking-[2px] text-gray-500">

                  EMAIL ADDRESS

                </label>

                <div className="mt-2 h-[58px] rounded-[14px] border border-gray-300 bg-white px-4 flex items-center gap-3 shadow-sm">

                  <Mail size={18} className="text-gray-400" />

                  <input
                    type="email"
                    placeholder="john@brandshoe.com"
                    className="w-full outline-none bg-transparent text-[16px]"
                  />

                </div>

              </div>

              {/* PASSWORD */}

              <div>

                <label className="text-[12px] font-bold tracking-[2px] text-gray-500">

                  PASSWORD

                </label>

                <div className="mt-2 h-[58px] rounded-[14px] border border-gray-300 bg-white px-4 flex items-center gap-3 shadow-sm">

                  <Lock size={18} className="text-gray-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full outline-none bg-transparent text-[16px]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >

                    {showPassword ? (

                      <EyeOff size={20} />

                    ) : (

                      <Eye size={20} />

                    )}

                  </button>

                </div>

              </div>

              {/* PASSWORD STATUS */}

              <div className="space-y-2">

                <p className={hasLength ? "text-green-600 text-[12px]" : "text-gray-500 text-[12px]"}>

                  ✓ Minimum 8 characters

                </p>

                <p className={hasSpecial ? "text-green-600 text-[12px]" : "text-gray-500 text-[12px]"}>

                  ✓ Must contain @ or special character

                </p>

                <p className={hasUpper ? "text-green-600 text-[12px]" : "text-gray-500 text-[12px]"}>

                  ✓ At least one uppercase letter

                </p>

                <p className={strongPassword ? "text-green-600 text-[12px] font-bold" : "text-red-500 text-[12px] font-bold"}>

                  {strongPassword ? "STRONG PASSWORD" : "WEAK PASSWORD"}

                </p>

              </div>

              {/* BUTTON */}

              <button className="w-full h-[60px] bg-black text-white rounded-[15px] text-[15px] font-bold tracking-[2px] hover:bg-[#c8161d] transition duration-300 shadow-xl">

                CREATE ACCOUNT

              </button>

              {/* LOGIN */}

              <p className="text-center text-gray-600 text-[15px] pt-2">

                Already have Account?

                <Link
                  to="/login"
                  className="text-black font-semibold ml-2 hover:text-[#c8161d] transition"
                >

                  Log in

                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}