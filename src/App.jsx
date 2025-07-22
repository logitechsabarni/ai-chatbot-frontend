// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import Chat from './components/Chat'; // Assuming this is your main chat UI
import './index.css';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <main className="p-4">
        <Chat />
      </main>
    </div>
  );
};

export default App;
