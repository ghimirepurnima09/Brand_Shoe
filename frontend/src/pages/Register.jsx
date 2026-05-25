import { useState } from "react";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShoppingCart,
  UserCircle,
  ArrowLeft
} from "lucide-react";

import { Link } from "react-router-dom";

import Shoe6 from "../assets/Shoe6.png";
import logo from "../assets/logo.png";

export default function Register() {

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  // PASSWORD CHECKS

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

        {/* CENTER */}

        <div className="hidden lg:flex items-center gap-10 text-[14px] font-semibold text-gray-600">

          <button className="hover:text-black transition">

            Collections

          </button>

          <button className="hover:text-black transition">

            Womens

          </button>

          <button className="hover:text-black transition">

            Kids

          </button>

          <button className="hover:text-black transition">

            Mens

          </button>

          <button className="hover:text-black transition">

            New Arrival

          </button>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-4">

          <ShoppingCart
            size={22}
            className="cursor-pointer hover:scale-110 transition"
          />

          <UserCircle
            size={24}
            className="cursor-pointer hover:scale-110 transition"
          />

        </div>

      </nav>

      {/* MAIN */}

      <div className="flex-1 flex items-center justify-center px-5 py-8">

        <div className="w-full max-w-[1280px] grid lg:grid-cols-2 gap-8 items-center">

          {/* LEFT SIDE */}

          <div className="relative rounded-[24px] overflow-hidden bg-black h-[560px] shadow-2xl">

            {/* BACK BUTTON */}

            <Link
              to="/login"
              className="absolute top-5 left-5 z-20 w-[42px] h-[42px] rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition"
            >

              <ArrowLeft size={20} />

            </Link>

            {/* IMAGE */}

            <img
              src={Shoe6}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-95"
            />

            {/* OVERLAY */}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20"></div>

            {/* GLOW */}

            <div className="absolute top-[-60px] left-[30%] w-[280px] h-[280px] bg-white/10 rounded-full blur-3xl"></div>

            {/* CARD */}

            <div className="absolute bottom-6 left-6 bg-white/92 backdrop-blur-md rounded-[20px] p-6 max-w-[300px] shadow-2xl">

              <h2 className="text-[34px] font-black leading-[36px] tracking-[-2px] text-black">

                THE VAULT
                <br />
                IS OPEN.

              </h2>

              <p className="text-gray-600 text-[15px] leading-[26px] mt-4">

                Access the most exclusive releases and limited edition drops before anyone else.

              </p>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="px-1 lg:px-4">

            {/* TITLE */}

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

                  <User
                    size={18}
                    className="text-gray-400"
                  />

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

                  <Mail
                    size={18}
                    className="text-gray-400"
                  />

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

                  <Lock
                    size={18}
                    className="text-gray-400"
                  />

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
                    className="text-gray-400 hover:text-black transition"
                  >

                    {showPassword ? (

                      <EyeOff size={20} />

                    ) : (

                      <Eye size={20} />

                    )}

                  </button>

                </div>

              </div>

              {/* PASSWORD STRENGTH */}

              <div className="space-y-3">

                <div className="flex gap-2">

                  <div className={`flex-1 h-[5px] rounded-full ${hasLength ? "bg-green-500" : "bg-gray-300"}`}></div>

                  <div className={`flex-1 h-[5px] rounded-full ${hasSpecial ? "bg-green-500" : "bg-gray-300"}`}></div>

                  <div className={`flex-1 h-[5px] rounded-full ${hasUpper ? "bg-green-500" : "bg-gray-300"}`}></div>

                </div>

                <div className="text-[12px] space-y-1">

                  <p className={hasLength ? "text-green-600" : "text-gray-500"}>

                    ✓ Minimum 8 characters

                  </p>

                  <p className={hasSpecial ? "text-green-600" : "text-gray-500"}>

                    ✓ Must contain @ or special character

                  </p>

                  <p className={hasUpper ? "text-green-600" : "text-gray-500"}>

                    ✓ At least one uppercase letter

                  </p>

                </div>

                <p className={`text-[12px] font-bold tracking-[1px] ${strongPassword ? "text-green-600" : "text-red-500"}`}>

                  {strongPassword
                    ? "STRONG PASSWORD"
                    : "WEAK PASSWORD"}

                </p>

              </div>

              {/* TERMS */}

              <div className="flex items-start gap-3 pt-1">

                <input
                  type="checkbox"
                  className="mt-1 w-[18px] h-[18px] accent-black"
                />

                <p className="text-gray-600 text-[14px] leading-[24px]">

                  I agree to the

                  <span className="text-black underline cursor-pointer ml-1">

                    Terms of Access

                  </span>

                  {" "}and{" "}

                  <span className="text-black underline cursor-pointer">

                    Privacy Policy

                  </span>

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