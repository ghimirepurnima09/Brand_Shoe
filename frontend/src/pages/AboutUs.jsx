import Navbar from "./Navbar";
import Footer from "./Footer";
import { MapPin, Mail, Phone } from "lucide-react";

const team = [
  { name: "Purnima Ghimire", role: "Founder & CEO", initial: "P" },
];

const values = [
  {
    icon: "👟",
    title: "Authentic Quality",
    desc: "Every pair we carry is 100% authentic, sourced directly from brand-authorized distributors.",
  },
  {
    icon: "🚀",
    title: "Fast Delivery",
    desc: "Same-day dispatch within Kathmandu. Nation-wide delivery in 3–5 business days.",
  },
  {
    icon: "🔄",
    title: "Easy Returns",
    desc: "Not the right fit? Return or exchange within 7 days — no questions asked.",
  },
  {
    icon: "💬",
    title: "Real Support",
    desc: "Our team is reachable 7 days a week. Chat, call, or email — we're always here.",
  },
];

export default function AboutUs() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      {/* HERO */}
      <div className="relative h-[420px] overflow-hidden rounded-b-[50px] mt-0">
        <img
          src="https://images.unsplash.com/photo-1556906781-9a412961a28d?q=80&w=1800&auto=format&fit=crop"
          alt="About us"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/75" />

        <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-16 pt-[82px]">
          <p className="text-[#8da27f] tracking-[4px] text-[12px] font-bold uppercase">
            Brand_Shoe
          </p>

          <h1 className="text-white text-[65px] lg:text-[90px] leading-[88%] font-black tracking-[-5px] mt-5">
            ABOUT
            <br />
            US
          </h1>
        </div>
      </div>

      <div className="px-6 lg:px-16 py-20 space-y-24">

        {/* STORY */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#8da27f] tracking-[3px] text-[11px] font-bold uppercase mb-4">
              Our Story
            </p>

            <h2 className="text-white text-[44px] font-black tracking-[-2px] leading-[100%] mb-6">
              Born from a
              <br />
              love of sneakers
            </h2>

            <p className="text-gray-400 text-base leading-[30px] mb-5">
              Brand_Shoe was founded in 2020 by Purnima Ghimire with a vision
              to create a modern and trusted footwear destination for sneaker
              lovers across Nepal. Inspired by a strong passion for fashion,
              quality, and authentic streetwear culture, the journey began as a
              small independent project focused on delivering genuine products
              at fair prices.
            </p>

            <p className="text-gray-400 text-base leading-[30px]">
              Over time, Brand_Shoe has grown into an online platform that
              offers stylish and comfortable footwear for Men, Women, and Kids
              from some of the world’s most recognized brands. The goal has
              always remained the same — to provide customers with premium
              quality shoes, a smooth shopping experience, and reliable service
              they can trust.
            </p>
          </div>

          <div className="relative h-[360px] rounded-[32px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=900&auto=format&fit=crop"
              alt="Our store"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>

        {/* VALUES */}
        <div>
          <p className="text-[#8da27f] tracking-[3px] text-[11px] font-bold uppercase mb-4">
            What we stand for
          </p>

          <h2 className="text-white text-[44px] font-black tracking-[-2px] leading-[100%] mb-12">
            Our Values
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-[#161616] border border-white/10 rounded-[24px] p-7 hover:-translate-y-1 transition duration-300"
              >
                <p className="text-4xl mb-5">{v.icon}</p>

                <h3 className="text-white font-black text-xl mb-3">
                  {v.title}
                </h3>

                <p className="text-gray-400 text-sm leading-[24px]">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* TEAM */}
        <div>
          <p className="text-[#8da27f] tracking-[3px] text-[11px] font-bold uppercase mb-4">
            The people behind the brand
          </p>

          <h2 className="text-white text-[44px] font-black tracking-[-2px] leading-[100%] mb-12">
            Meet the Team
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-[#161616] border border-white/10 rounded-[24px] p-8 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-[#8da27f]/20 border-2 border-[#8da27f] flex items-center justify-center mb-5">
                  <span className="text-[#8da27f] text-3xl font-black">
                    {member.initial}
                  </span>
                </div>

                <h3 className="text-white font-black text-xl">
                  {member.name}
                </h3>

                <p className="text-[#8da27f] text-xs tracking-[2px] uppercase font-bold mt-2">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CONTACT */}
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <p className="text-[#8da27f] tracking-[3px] text-[11px] font-bold uppercase mb-4">
              Get in touch
            </p>

            <h2 className="text-white text-[44px] font-black tracking-[-2px] leading-[100%] mb-8">
              Contact Us
            </h2>

            <div className="flex flex-col gap-5">
              {[
                {
                  icon: <MapPin size={20} />,
                  label: "Location",
                  value: "Thamel, Kathmandu, Nepal",
                },
                {
                  icon: <Mail size={20} />,
                  label: "Email",
                  value: "brandshoe123@gmail.com",
                },
                {
                  icon: <Phone size={20} />,
                  label: "Phone",
                  value: "+977 9876543210",
                },
              ].map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-5 bg-[#161616] rounded-2xl border border-white/10 px-6 py-5"
                >
                  <div className="w-10 h-10 rounded-full bg-[#8da27f]/10 flex items-center justify-center text-[#8da27f] shrink-0">
                    {icon}
                  </div>

                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-[2px] font-bold">
                      {label}
                    </p>

                    <p className="text-white font-bold text-base mt-1">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MAP */}
          <div className="bg-[#161616] border border-white/10 rounded-[32px] overflow-hidden min-h-[320px] flex items-center justify-center relative">
            <iframe
              title="Brand Shoe Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.675!2d85.3108!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18f6f0e9e0a7%3A0xb7e7f0b0b0b0b0b0!2sThamel%2C%20Kathmandu!5e0!3m2!1sen!2snp!4v1620000000000!5m2!1sen!2snp"
              className="absolute inset-0 w-full h-full border-0 opacity-70"
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}