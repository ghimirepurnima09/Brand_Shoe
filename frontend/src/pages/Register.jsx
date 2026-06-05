import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const hasLength = password.length >= 8;
  const hasSpecial = /[@$!%*?&]/.test(password);
  const hasUpper = /[A-Z]/.test(password);

  const handleRegister = async () => {
    setMessage("");
    setErrorMessage("");

    if (!name || !email || !password) {
      setErrorMessage("Please fill all fields");
      return;
    }
    if (!hasLength || !hasSpecial || !hasUpper) {
      setErrorMessage("Password is not strong enough");
      return;
    }
    if (!agree) {
      setErrorMessage("Please agree to Terms & Conditions");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      setMessage(response.data.message);
      setName(""); setEmail(""); setPassword("");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#f3f3f3] flex flex-col">
      <nav className="w-full h-[78px] bg-white border-b border-gray-200 flex items-center px-6 lg:px-14 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <img src={logo} alt="" className="w-[46px] h-[46px] rounded-full object-cover" />
          <h1 className="text-[30px] font-black tracking-[-2px]">Brand_Shoe</h1>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-5 py-8">
        <div className="w-full max-w-[1280px] grid lg:grid-cols-2 gap-8 items-center">

          {/* LEFT */}
          <div className="relative rounded-[30px] overflow-hidden h-[560px]">
            <Link to="/login" className="absolute top-5 left-5 z-20 w-[42px] h-[42px] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition">
              <ArrowLeft size={20} />
            </Link>
            <img
              src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1400&auto=format&fit=crop"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-10 left-10 z-20">
              <h1 className="text-white text-[60px] leading-[90%] font-black tracking-[-4px]">
                JOIN THE<br />SNEAKER<br />
                <span className="text-[#8da27f]">CULTURE</span>
              </h1>
            </div>
          </div>

          {/* RIGHT */}
          <div className="px-1 lg:px-8">
            <h1 className="text-[62px] leading-[60px] font-black tracking-[-4px] text-black">
              Join the<br />Brand_Shoe
            </h1>
            <p className="text-gray-500 text-[17px] mt-4">
              Create your profile to start your sneaker journey.
            </p>

            {message && (
              <div className="mt-6 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-xl text-sm">
                {message}
              </div>
            )}
            {errorMessage && (
              <div className="mt-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm">
                {errorMessage}
              </div>
            )}

            <div className="mt-9 space-y-5">
              {/* NAME */}
              <div>
                <label className="text-[12px] font-bold tracking-[2px] text-gray-500">FULL NAME</label>
                <div className="mt-2 h-[58px] rounded-[16px] border border-gray-300 bg-white px-4 flex items-center gap-3 shadow-sm">
                  <User size={18} className="text-gray-400" />
                  <input type="text" placeholder="John Doe" value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full outline-none bg-transparent text-[15px]" />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-[12px] font-bold tracking-[2px] text-gray-500">EMAIL ADDRESS</label>
                <div className="mt-2 h-[58px] rounded-[16px] border border-gray-300 bg-white px-4 flex items-center gap-3 shadow-sm">
                  <Mail size={18} className="text-gray-400" />
                  <input type="email" placeholder="john@brandshoe.com" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full outline-none bg-transparent text-[15px]" />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-[12px] font-bold tracking-[2px] text-gray-500">PASSWORD</label>
                <div className="mt-2 h-[58px] rounded-[16px] border border-gray-300 bg-white px-4 flex items-center gap-3 shadow-sm">
                  <Lock size={18} className="text-gray-400" />
                  <input type={showPassword ? "text" : "password"}
                    placeholder="Create strong password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full outline-none bg-transparent text-[15px]" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-black transition">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* PASSWORD RULES */}
              <div className="space-y-2">
                <p className={hasLength ? "text-green-600 text-[12px]" : "text-gray-500 text-[12px]"}>✓ Minimum 8 characters</p>
                <p className={hasSpecial ? "text-green-600 text-[12px]" : "text-gray-500 text-[12px]"}>✓ Must contain special character (@$!%*?&)</p>
                <p className={hasUpper ? "text-green-600 text-[12px]" : "text-gray-500 text-[12px]"}>✓ At least one uppercase letter</p>
              </div>

              {/* TERMS */}
              <div className="flex items-start gap-3">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1" />
                <p className="text-[12px] text-gray-500 leading-[22px]">
                  I agree to the Terms & Conditions and Privacy Policy
                </p>
              </div>

              <button onClick={handleRegister} disabled={loading}
                className={`w-full h-[60px] rounded-[16px] text-[15px] font-bold tracking-[2px] transition duration-300 shadow-lg ${
                  loading ? "bg-gray-400 text-white cursor-not-allowed" : "bg-black text-white hover:bg-[#6f8f62]"
                }`}>
                {loading ? "CREATING..." : "CREATE ACCOUNT"}
              </button>

              <p className="text-center text-gray-600 text-[15px]">
                Already have an Account?
                <Link to="/login" className="text-black font-semibold ml-2 hover:text-[#6f8f62] transition">Log in</Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}