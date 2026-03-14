import Room from "../models/Room.js";
import Message from "../models/Message.js";

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({})
      .sort({ lastActivity: -1 })
      .lean();

    const data = rooms.map((room) => ({
      id: room._id,
      subject: room.subject,
      createdBy: room.createdBy,
      createdAt: room.createdAt,
      lastActivity: room.lastActivity,
      participantsCount: room.participants?.length || 0,
    }));

    return res.json({ rooms: data });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};

export const createRoom = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, subject } = req.body || {};
    const roomName = typeof name === "string" ? name : subject;

    if (!roomName || typeof roomName !== "string") {
      return res.status(400).json({ success: false, message: "Room name is required" });
    }

    const trimmed = roomName.trim();
    if (!trimmed) {
      return res.status(400).json({ success: false, message: "Room name is required" });
    }

    const room = await Room.create({
      subject: trimmed,
      createdBy: userId,
      participants: [userId],
    });

    return res.status(201).json({
      success: true,
      room: {
        id: room._id,
        subject: room.subject,
        createdBy: room.createdBy,
        createdAt: room.createdAt,
        lastActivity: room.lastActivity,
        participantsCount: room.participants.length,
      },
    });
  } catch (error) {
    console.error("createRoom error:", error);
    return res.status(500).json({ success: false, message: error.message || "Server error" });
  }
};

export const getRoomMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 50));

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const skip = (page - 1) * limit;

    const messages = await Message.find({ roomId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("sender", "name")
      .lean();

    const formatted = messages
      .reverse()
      .map((m) => ({
        id: m._id,
        roomId: m.roomId,
        userId: m.sender?._id ? String(m.sender._id) : null,
        text: m.content,
        type: m.type,
        createdAt: m.createdAt,
        authorName: m.sender?.name || (m.type === "ai" ? "AI Assistant" : "Unknown"),
      }));

    return res.json({
      page,
      limit,
      count: formatted.length,
      messages: formatted,
    });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};

