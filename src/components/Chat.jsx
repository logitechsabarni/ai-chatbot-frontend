import { useState } from "react";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      console.log("📩 Response from backend:", data); // Debug log

      if (data.response) {
        setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
      } else {
        setMessages((prev) => [...prev, { sender: "bot", text: "Error: No response from AI" }]);
      }
    } catch (err) {
      console.error("❌ Error:", err);
      setMessages((prev) => [...prev, { sender: "bot", text: "Server error occurred" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 h-[400px] overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block px-3 py-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"}`}>
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <p className="text-center text-sm text-gray-500">Thinking...</p>}
      </div>

      <div className="flex mt-4 gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 px-3 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          placeholder="Ask me anything..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
