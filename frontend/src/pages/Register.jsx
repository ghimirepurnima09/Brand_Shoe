// ==============================
// Register.jsx
// ==============================

import { useState } from "react";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft
} from "lucide-react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import axios from "axios";

import logo from "../assets/logo.png";

export default function Register() {

  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [agree, setAgree] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const hasLength = password.length >= 8;

  const hasSpecial = /[@$!%*?&]/.test(password);

  const hasUpper = /[A-Z]/.test(password);

  // ==============================
  // REGISTER FUNCTION
  // ==============================

  const handleRegister = async () => {

    if (!name || !email || !password) {

      alert("Please fill all fields");

      return;

    }

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password
        }
      );

      alert(response.data.message);

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <section className="min-h-screen bg-[#f3f3f3] flex flex-col">

      {/* NAVBAR */}

      <nav className="w-full h-[78px] bg-white border-b border-gray-200 flex items-center px-6 lg:px-14">

        <div className="flex items-center gap-4">

          <img
            src={logo}
            alt=""
            className="w-[46px] h-[46px] rounded-full"
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

          <div className="relative rounded-[30px] overflow-hidden h-[560px]">

            <Link
              to="/login"
              className="absolute top-5 left-5 z-20 w-[42px] h-[42px] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white"
            >

              <ArrowLeft size={20} />

            </Link>

            <img
              src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1400&auto=format&fit=crop"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/40"></div>

          </div>

          {/* RIGHT */}

          <div className="px-1 lg:px-8">

            <h1 className="text-[62px] leading-[60px] font-black tracking-[-4px]">

              Join the
              <br />
              Brand_Shoe

            </h1>

            <p className="text-gray-500 text-[17px] mt-4">

              Create your profile to start your sneaker journey.

            </p>

            {/* FORM */}

            <div className="mt-9 space-y-5">

              {/* NAME */}

              <div>

                <label className="text-[12px] font-bold tracking-[2px] text-gray-500">

                  FULL NAME

                </label>

                <div className="mt-2 h-[58px] rounded-[16px] border border-gray-300 bg-white px-4 flex items-center gap-3">

                  <User size={18} className="text-gray-400" />

                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full outline-none"
                  />

                </div>

              </div>

              {/* EMAIL */}

              <div>

                <label className="text-[12px] font-bold tracking-[2px] text-gray-500">

                  EMAIL ADDRESS

                </label>

                <div className="mt-2 h-[58px] rounded-[16px] border border-gray-300 bg-white px-4 flex items-center gap-3">

                  <Mail size={18} className="text-gray-400" />

                  <input
                    type="email"
                    placeholder="john@brandshoe.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full outline-none"
                  />

                </div>

              </div>

              {/* PASSWORD */}

              <div>

                <label className="text-[12px] font-bold tracking-[2px] text-gray-500">

                  PASSWORD

                </label>

                <div className="mt-2 h-[58px] rounded-[16px] border border-gray-300 bg-white px-4 flex items-center gap-3">

                  <Lock size={18} className="text-gray-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >

                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}

                  </button>

                </div>

              </div>

              {/* PASSWORD RULES */}

              <div className="space-y-2">

                <p className={hasLength ? "text-green-600 text-[12px]" : "text-gray-500 text-[12px]"}>

                  ✓ Minimum 8 characters

                </p>

                <p className={hasSpecial ? "text-green-600 text-[12px]" : "text-gray-500 text-[12px]"}>

                  ✓ Must contain special character

                </p>

                <p className={hasUpper ? "text-green-600 text-[12px]" : "text-gray-500 text-[12px]"}>

                  ✓ At least one uppercase letter

                </p>

              </div>

              {/* TERMS */}

              <div className="flex items-start gap-3">

                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-1"
                />

                <p className="text-[12px] text-gray-500 leading-[22px]">

                  I agree to the Terms & Conditions and Privacy Policy

                </p>

              </div>

              {/* BUTTON */}

              <button
                onClick={handleRegister}
                disabled={!agree || loading}
                className={`w-full h-[60px] rounded-[16px] text-[15px] font-bold tracking-[2px] ${
                  agree
                    ? "bg-black text-white hover:bg-[#6f8f62]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >

                {
                  loading
                    ? "CREATING..."
                    : "CREATE ACCOUNT"
                }

              </button>

              {/* LOGIN */}

              <p className="text-center text-gray-600 text-[15px]">

                Already have an Account?

                <Link
                  to="/login"
                  className="text-black font-semibold ml-2"
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