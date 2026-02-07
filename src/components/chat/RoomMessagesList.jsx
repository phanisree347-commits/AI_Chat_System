import { useChatScroll } from '../../hooks/useChatScroll.js'
import MessageBubble from './MessageBubble.jsx'

// Scrollable list of messages for a room. It stays presentational:
// it receives messages + currentUserId from the parent and only
// decides how to render them.
export default function RoomMessagesList({ messages, currentUserId }) {
  const containerRef = useChatScroll(messages)

  return (
    <section
      ref={containerRef}
      className="flex-1 overflow-y-auto px-3 py-3 bg-slate-50/60 space-y-2"
      aria-label="Room messages"
    >
      {messages.length === 0 && (
        <p className="text-xs text-slate-500 text-center mt-4">
          No messages yet. Start the conversation for this room.
        </p>
      )}

      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          isOwn={message.userId === currentUserId}
        />
      ))}
    </section>
  )
}

