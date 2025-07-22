import { useEffect, useState } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-900 shadow">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        <span className="text-xl font-bold text-gray-800 dark:text-white">
          SmartCare AI
        </span>
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-3 py-1 rounded border dark:border-gray-600 text-gray-800 dark:text-white"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </nav>
  );
}
