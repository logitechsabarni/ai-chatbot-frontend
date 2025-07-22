import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-2">
        {/* ✅ Directly use public path for logo */}
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        <span className="font-semibold text-xl">SmartCare AI</span>
      </div>
      <div>
        <a
          href="#"
          className="text-gray-300 hover:text-white transition duration-200"
        >
          Home
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
