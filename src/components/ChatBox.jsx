import React, { useState } from "react";
import axios from "axios";

const ChatBox = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);

  const handleTextSubmit = async () => {
    if (!input) return;
    try {
      const res = await axios.post("https://ai-chatbot-1-bhrx.onrender.com/chat", {
        message: input,
      });
      setResponse(res.data.response);
    } catch (err) {
      setResponse("Error: " + err.message);
    }
  };

  const handleImageSubmit = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post("https://ai-chatbot-1-bhrx.onrender.com/image", formData);
      setResponse(`Text: ${res.data.extracted}\n\nAI: ${res.data.response}`);
    } catch (err) {
      setResponse("Image Error: " + err.message);
    }
  };

  const handleAudioSubmit = async () => {
    if (!audio) return;
    const formData = new FormData();
    formData.append("audio", audio);

    try {
      const res = await axios.post("https://ai-chatbot-1-bhrx.onrender.com/voice", formData);
      setResponse(`You said: ${res.data.transcription}\n\nAI: ${res.data.response}`);
    } catch (err) {
      setResponse("Audio Error: " + err.message);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <textarea
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything..."
        className="w-full p-2 border rounded dark:bg-gray-800"
      />
      <div className="flex gap-2">
        <button onClick={handleTextSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button onClick={handleImageSubmit} className="bg-green-600 text-white px-4 py-2 rounded">Upload Image</button>
      </div>
      <div className="flex gap-2">
        <input type="file" accept="audio/*" onChange={(e) => setAudio(e.target.files[0])} />
        <button onClick={handleAudioSubmit} className="bg-purple-600 text-white px-4 py-2 rounded">Upload Audio</button>
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded whitespace-pre-wrap">{response}</div>
    </div>
  );
};

export default ChatBox;
