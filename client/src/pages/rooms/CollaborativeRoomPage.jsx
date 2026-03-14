import { useState, useEffect } from "react";
import { getSocket } from "../../services/socket";
import RoomChat from "./RoomChat";

export default function CollaborativeRoomPage() {

  const [socket, setSocket] = useState(null);
  const [socketReady, setSocketReady] = useState(false);
  const [activeRoomId, setActiveRoomId] = useState(null);

  const rooms = [
    { id: "math", name: "Mathematics Room" },
    { id: "physics", name: "Physics Room" },
    { id: "programming", name: "Programming Room" }
  ];

  useEffect(() => {

    const s = getSocket();

    setSocket(s);

    s.on("connect", () => {
      console.log("✅ Connected:", s.id);
      setSocketReady(true);
    });

    s.on("disconnect", () => {
      console.log("❌ Disconnected");
      setSocketReady(false);
    });

    return () => {
      s.off("connect");
      s.off("disconnect");
    };

  }, []);

const joinRoom = (roomId) => {

  if (!socket) return;

  if (activeRoomId) {
    socket.emit("leave_room", { roomId: activeRoomId });
  }

  socket.emit("join_room", { roomId });

  setActiveRoomId(roomId);
};

  return (

    <div className="flex h-screen">

      {/* Room List */}

      <div className="w-64 border-r p-4">

        <h2 className="font-bold mb-4">
          Collaborative Rooms
        </h2>

        {rooms.map((room) => (

          <button
            key={room.id}
            onClick={() => joinRoom(room.id)}
            className="block w-full text-left p-2 mb-2 bg-slate-100 rounded hover:bg-slate-200"
          >
            {room.name}
          </button>

        ))}

      </div>

      {/* Chat Area */}

      <div className="flex-1">

        {!socketReady && (
          <div className="p-10 text-gray-500">
            Connecting to chat server...
          </div>
        )}

        {socketReady && activeRoomId && (
          <RoomChat socket={socket} roomId={activeRoomId} />
        )}

        {socketReady && !activeRoomId && (
          <div className="p-10 text-slate-500">
            Select a room to start chatting
          </div>
        )}

      </div>

    </div>
  );
}