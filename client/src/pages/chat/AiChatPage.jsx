import ChatMessageList from '../../components/chat/ChatMessageList.jsx'
import ChatInput from '../../components/chat/ChatInput.jsx'
import { useDemoChat } from '../../hooks/useDemoChat.js'

export default function AiChatPage() {
  const { messages, handleSend, loading } = useDemoChat({
    initialMessages: [
      {
        id: 1,
        role: 'assistant',
        text: 'Hi! I am your AI chat assistant. Ask me anything.',
      },
    ],
  })

  return (
    <div className="flex flex-col h-full space-y-4">

      <div
        className="flex flex-col h-[420px] sm:h-[480px]
        rounded-2xl bg-white overflow-hidden
        shadow-sm border border-slate-200"
      >
        <ChatMessageList messages={messages} />

        {loading && (
          <div className="px-4 py-2 text-xs text-slate-400 italic bg-white">
            AI is thinking…
          </div>
        )}

        <div className="border-t border-slate-200 bg-white px-3 py-2">
          <ChatInput
            placeholder="Ask AI something…"
            onSend={handleSend}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  )
}