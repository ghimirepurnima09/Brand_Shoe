
// ==============================
// ForgotPassword.jsx
// ==============================

import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  Mail,
  ArrowLeft,
  ShieldCheck
} from "lucide-react";

import axios from "axios";

import logo from "../assets/logo.png";

export default function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSendOtp = async () => {

    setMessage("");
    setErrorMessage("");

    if (!email) {

      setErrorMessage("Please enter your email");

      return;

    }

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/sendotp",
        {
          email
        }
      );

      // SUCCESS MESSAGE

      setMessage(response.data.message);

      // SAVE EMAIL

      localStorage.setItem("resetEmail", email);

      // OPEN RESET PASSWORD PAGE

      setTimeout(() => {

        navigate("/resetpassword");

      }, 1500);

    } catch (error) {

      console.log(error);

      setErrorMessage(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <section className="min-h-screen bg-[#f3f3f3] flex overflow-hidden">

      {/* LEFT SIDE */}

      <div className="hidden lg:flex flex-1 bg-black relative items-center justify-center overflow-hidden">

        {/* BACKGROUND */}

        <img
          src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1600&auto=format&fit=crop"
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
          src="https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1400&auto=format&fit=crop"
          alt=""
          className="w-[560px] z-10 object-contain drop-shadow-[0_35px_35px_rgba(255,255,255,0.18)] hover:scale-105 transition duration-700"
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
              SECURELY
            </span>

          </h1>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="flex-1 bg-[#f3f3f3] flex items-center justify-center px-5">

        <div className="w-full max-w-[390px]">

          {/* BACK */}

          <Link
            to="/login"
            className="flex items-center gap-2 text-gray-500 hover:text-black transition mb-7 font-medium"
          >

            <ArrowLeft size={17} />

            Back to Login

          </Link>

          <h1 className="text-[46px] leading-[46px] font-black tracking-[-3px] text-black">

            Forgot
            <br />
            Password.

          </h1>

          <p className="text-gray-500 text-[15px] mt-4 leading-[28px]">

            Enter your email address and we’ll send you a password reset OTP code.

          </p>

          {/* SUCCESS MESSAGE */}

          {
            message && (

              <div className="mt-5 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-xl text-sm">

                {message}

              </div>

            )
          }

          {/* ERROR MESSAGE */}

          {
            errorMessage && (

              <div className="mt-5 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm">

                {errorMessage}

              </div>

            )
          }

          {/* EMAIL */}

          <div className="mt-8">

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent outline-none w-full text-[15px]"
              />

            </div>

          </div>

          {/* BUTTON */}

          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full h-[58px] bg-black text-white rounded-[14px] mt-8 text-[13px] tracking-[3px] font-bold hover:bg-[#6f8f62] transition duration-300 shadow-xl disabled:opacity-70"
          >

            {
              loading
                ? "SENDING..."
                : "SEND OTP"
            }

          </button>

          {/* EXTRA BOX */}

          <div className="mt-8 bg-white border border-gray-200 rounded-[20px] p-5 shadow-sm flex items-start gap-4">

            <div className="w-[52px] h-[52px] rounded-full bg-[#8da27f]/10 flex items-center justify-center">

              <ShieldCheck
                size={24}
                className="text-[#8da27f]"
              />

            </div>

            <div>

              <h3 className="font-bold text-[16px] text-black">
                Secure Recovery
              </h3>

              <p className="text-gray-500 text-[14px] leading-[24px] mt-1">

                Your account security is protected with encrypted password recovery.

              </p>

            </div>

          </div>

          {/* LOGIN */}

          <p className="text-center text-gray-500 text-[14px] mt-8">

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

    </section>

  );

}

