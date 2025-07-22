import { useEffect, useState } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-900 shadow-md sticky top-0 z-50">
      {/* Logo & Title */}
      <div className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="SmartCare Logo"
          className="h-10 w-10 object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/40";
          }}
        />
        <span className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">
          SmartCare AI
        </span>
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="text-lg px-3 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:shadow transition"
        aria-label="Toggle Dark Mode"
        title="Toggle Dark Mode"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
}
