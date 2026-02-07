import ChatMessageList from '../../components/chat/ChatMessageList.jsx'
import ChatInput from '../../components/chat/ChatInput.jsx'
import { useDemoChat } from '../../hooks/useDemoChat.js'

// Global AI assistant chat (frontend only).
export default function AiChatPage() {
  const { messages, handleSend } = useDemoChat({
    initialMessages: [
      {
        id: 1,
        role: 'assistant',
        text: 'Hi! I am your AI chat assistant. Ask me anything about your rooms or notes, and I will try to explain it clearly.',
      },
    ],
    replyText:
      'This is a placeholder AI response. Connect your backend or API client here to get real answers.',
    replyDelayMs: 650,
  })

  return (
    <div className="flex flex-col h-full space-y-4">
      <p className="text-xs text-slate-500">
        Chat is not persisted. Refreshing the page will clear this
        conversation.
      </p>
      <div className="flex flex-col h-[420px] sm:h-[480px] border border-slate-100 rounded-2xl bg-white overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <ChatMessageList messages={messages} />
        </div>
        <div className="border-t border-slate-100 p-3 bg-slate-50/70">
          <ChatInput
            placeholder="Ask the AI to explain a concept, summarise your notes, or suggest what to discuss next…"
            onSend={handleSend}
          />
        </div>
      </div>
    </div>
  )
}

