import { useState } from "react";

export default function RoomChatInput({ onSendMessage = () => {} }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const trimmed = message.trim();

    if (!trimmed) return;

    console.log("Sending message:", trimmed);

    // Call parent function safely
    if (typeof onSendMessage === "function") {
      onSendMessage(trimmed);
    }

    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex border-t p-3 gap-2">

      <input
        type="text"
        className="flex-1 border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        onClick={handleSend}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
      >
        Send
      </button>

    </div>
  );
}