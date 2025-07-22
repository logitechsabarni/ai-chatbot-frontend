// src/components/Chat.jsx
import React, { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const backendURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(`${backendURL}/chat`, {
        messages: updatedMessages,
      });

      const botMessage = {
        role: "assistant",
        content: response.data.response,
      };

      setMessages([...updatedMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "⚠️ Server error. Try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="h-96 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg ${
              msg.role === "user"
                ? "bg-blue-100 dark:bg-blue-700 text-right ml-auto"
                : "bg-gray-200 dark:bg-gray-600 text-left mr-auto"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="text-gray-500 dark:text-gray-300 italic">
            SmartCare is typing...
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask something..."
          className="flex-1 p-2 rounded border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
