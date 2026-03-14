import { Server } from "socket.io";

export function initSockets(server) {

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  console.log("🔌 Socket server initialized");

  io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    // join room
    socket.on("join_room", ({ roomId }) => {
      socket.join(roomId);
      console.log(`${socket.id} joined ${roomId}`);
    });

    // leave room
    socket.on("leave_room", ({ roomId }) => {
      socket.leave(roomId);
      console.log(`${socket.id} left ${roomId}`);
    });

    // ⭐ THIS WAS MISSING
    socket.on("send_message", (data) => {

      const message = {
        roomId: data.roomId,
        content: data.content,
        sender: socket.id
      };

      // send message to everyone in the room
      io.to(data.roomId).emit("receive_message", message);

    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });

  });

}