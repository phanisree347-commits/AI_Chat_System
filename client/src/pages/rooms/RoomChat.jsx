import { useEffect, useState } from "react";

export default function RoomChat({ socket, roomId }) {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {

    if (!socket) return;

    const handleReceive = (message) => {

      if (message.roomId !== roomId) return;

      setMessages((prev) => [...prev, message]);
    };

    socket.on("receive_message", handleReceive);

    return () => {
      socket.off("receive_message", handleReceive);
    };

  }, [socket, roomId]);

  const sendMessage = () => {

    // 🛑 Prevent error if socket not ready
    if (!socket) {
      console.error("Socket not initialized yet");
      return;
    }

    if (!input.trim()) return;

    const messageData = {
      roomId,
      content: input
    };

    socket.emit("send_message", messageData);

    setMessages((prev) => [
      ...prev,
      {
        ...messageData,
        sender: socket.id
      }
    ]);

    setInput("");
  };

  if (!socket) {
    return (
      <div className="p-10 text-gray-500">
        Connecting to chat server...
      </div>
    );
  }

  return (

    <div className="flex flex-col h-full">

      {/* messages */}

      <div className="flex-1 overflow-y-auto p-4 space-y-2">

        {messages.map((msg, index) => (

          <div key={index} className="p-2 bg-slate-100 rounded">

            <div className="text-xs text-gray-500">
  {msg.sender === socket.id ? "You" : msg.sender}
</div>

            <div>
              {msg.content}
            </div>

          </div>

        ))}

      </div>

      {/* input */}

      <div className="p-4 border-t flex gap-2">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Type message..."
        />

        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>

      </div>

    </div>
  );
}