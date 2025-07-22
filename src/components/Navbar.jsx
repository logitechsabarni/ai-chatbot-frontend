// src/components/Navbar.jsx
import React from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />
        <span className="text-xl font-bold">SmartCare AI</span>
      </div>
    </nav>
  );
};

export default Navbar;
