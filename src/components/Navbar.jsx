import React from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white dark:bg-gray-800">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-10 w-10" />
        <h1 className="text-2xl font-bold">SmartCare AI</h1>
      </div>
    </nav>
  );
};

export default Navbar;
