// src/components/Chat.jsx
import { useState } from "react";
import axios from "axios";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const backendUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post(`${backendUrl}/chat`, { message: input });
      const botMessage = {
        role: "bot",
        content: response.data.response || "No response from server.",
      };
      setMessages([...newMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMsg = {
        role: "bot",
        content: "⚠️ Error: Could not reach backend.",
      };
      setMessages([...newMessages, errorMsg]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded shadow p-4">
      <div className="h-96 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-md ${
              msg.role === "user"
                ? "bg-blue-100 dark:bg-blue-700 text-right"
                : "bg-gray-200 dark:bg-gray-700 text-left"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 rounded border dark:bg-gray-900 dark:border-gray-600"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
