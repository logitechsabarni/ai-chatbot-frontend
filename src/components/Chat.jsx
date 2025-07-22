// src/components/Chat.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessage = { sender: 'user', text: userInput };
    setChatHistory([...chatHistory, newMessage]);

    try {
      const res = await axios.post('https://smartcare-ai-chatbot.onrender.com/chat', {
        message: userInput,
      });

      const botResponse = res.data.response;

      setChatHistory(prev => [
        ...prev,
        newMessage,
        { sender: 'bot', text: botResponse },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setChatHistory(prev => [
        ...prev,
        newMessage,
        { sender: 'bot', text: 'Error: Could not fetch response.' },
      ]);
    }

    setUserInput('');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="space-y-4 h-80 overflow-y-auto mb-4 border border-gray-200 dark:border-gray-700 p-3 rounded">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`text-${msg.sender === 'user' ? 'right' : 'left'}`}>
            <p className={`p-2 rounded-lg inline-block ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-grow p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Type your message..."
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
