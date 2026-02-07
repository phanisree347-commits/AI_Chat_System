// Placeholder chat service for room messages.
// This file is intentionally tiny and beginner-friendly, but it gives you
// a clear place to add real-time logic later (for example, with Socket.io).

// Example message shape used across the app:
// {
//   id: string;
//   roomId: string;
//   userId: string;
//   authorName: string;
//   text: string;
//   createdAt: string; // ISO date string
// }

// In a real app, this function would:
// - open a WebSocket / Socket.io connection
// - join the given room
// - call the provided callbacks whenever a new message or system event arrives
export function connectToRoom(roomId, user, { onMessage, onSystemEvent } = {}) {
  // NOTE: This is only a placeholder. We return a "disconnect" function so the
  // calling component can clean up in useEffect later.

  // Example of where you would set up Socket.io:
  // const socket = io(BASE_URL)
  // socket.emit('room:join', { roomId, user })
  // socket.on('room:message', (message) => onMessage?.(message))
  // socket.on('room:system', (event) => onSystemEvent?.(event))

  return () => {
    // Example cleanup for a real Socket.io connection:
    // socket.disconnect()
  }
}

// In a real app this would send the message to your backend / Socket.io server.
// We keep the signature async-friendly so you can later `await` it.
export async function sendMessageToRoom(roomId, message) {
  // Example future implementation:
  // await apiClient.post(`/rooms/${roomId}/messages`, message)

  // For now we simply resolve immediately so UI code can still `await` this.
  return Promise.resolve({ ok: true })
}

