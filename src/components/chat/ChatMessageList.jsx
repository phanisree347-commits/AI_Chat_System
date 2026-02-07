import { useChatScroll } from '../../hooks/useChatScroll.js'

// Scrollable list of chat messages with user vs AI styling.
export default function ChatMessageList({ messages }) {
  const listRef = useChatScroll(messages)

  return (
    <div
      ref={listRef}
      className="h-full overflow-y-auto space-y-3 px-3 py-3 bg-slate-50/60"
    >
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm
              ${
                message.role === 'user'
                  ? 'bg-slate-900 text-slate-50 rounded-br-sm'
                  : 'bg-white text-slate-800 border border-slate-100 rounded-bl-sm'
              }`}
          >
            {message.text}
          </div>
        </div>
      ))}

      {messages.length === 0 && (
        <p className="text-xs text-slate-500 text-center mt-4">
          Start the conversation by asking a question.
        </p>
      )}
    </div>
  )
}

