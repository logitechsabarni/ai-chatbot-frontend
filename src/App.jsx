// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import Chat from './components/Chat'; // Your main chat UI
import './index.css';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <main className="p-4 max-w-4xl mx-auto">
        <Chat />
      </main>
    </div>
  );
};

export default App;
