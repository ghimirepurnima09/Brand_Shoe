export default function Footer() {

  return (

    <footer className="bg-black text-white py-16">

      <div className="max-w-[1180px] mx-auto px-6 text-center">

        <h1 className="text-[42px] font-black tracking-[-2px]">

          BRAND_SHOE

        </h1>

        <div className="flex flex-wrap justify-center gap-8 mt-8 text-gray-400 text-[13px]">

          <p className="hover:text-white transition cursor-pointer">
            Authenticity
          </p>

          <p className="hover:text-white transition cursor-pointer">
            Returns
          </p>

          <p className="hover:text-white transition cursor-pointer">
            Privacy
          </p>

          <p className="hover:text-white transition cursor-pointer">
            Global Access
          </p>

        </div>

        <div className="w-[100px] h-[1px] bg-gray-700 mx-auto my-8"></div>

        <p className="text-gray-500 text-[12px]">

          © 2026 BRAND_SHOE. All Rights Reserved.

        </p>

      </div>

    </footer>

  );

}