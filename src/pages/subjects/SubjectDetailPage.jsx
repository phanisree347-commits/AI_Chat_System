import { useState } from 'react'
import PrimaryButton from '../../components/common/PrimaryButton.jsx'
import ChatMessageList from '../../components/chat/ChatMessageList.jsx'
import ChatInput from '../../components/chat/ChatInput.jsx'
import { useDemoChat } from '../../hooks/useDemoChat.js'

const TABS = [
  { id: 'notes', label: 'Notes' },
  { id: 'practice', label: 'Practice' },
  { id: 'ai', label: 'Chat' },
]

// Detail view for a specific subject chat room with:
// Notes | Practice | Chat (AI-assisted room conversation).
export default function SubjectDetailPage({ subject, onBack }) {
  const [activeTab, setActiveTab] = useState('ai')

  // Dedicated demo chat state for this subject's room.
  // TODO: Replace useDemoChat with real chat backend (e.g. WebSocket / HTTP)
  // when wiring the AI chat service.
  const { messages, handleSend } = useDemoChat({
    initialMessages: [
      {
        id: 1,
        role: 'assistant',
        text: `Hi! I can help you study ${subject.name}. What topic are you working on?`,
      },
    ],
    replyText:
      'This is a demo response. In a real app, this would call your AI API with extra context about the current subject.',
    replyDelayMs: 500,
  })

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            ← Back
          </button>
          <div>
            <p className="text-xs font-medium text-slate-500">
              Subject chat room
            </p>
            <h3 className="text-lg font-semibold text-slate-900">
              {subject.name}
            </h3>
          </div>
        </div>
        <PrimaryButton className="text-xs px-3 py-1.5">
          Add to study plan
        </PrimaryButton>
      </div>

      <div className="flex flex-col h-full border border-slate-100 rounded-2xl">
        <div className="flex border-b border-slate-100 bg-slate-50/80 rounded-t-2xl px-3 py-2 gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition
                ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:bg-white/60'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 rounded-b-2xl bg-white">
          {activeTab === 'notes' && <NotesSection subject={subject} />}
          {activeTab === 'practice' && <PracticeSection subject={subject} />}
          {activeTab === 'ai' && (
            <AiHelpSection
              subject={subject}
              messages={messages}
              onSendMessage={handleSend}
            />
          )}
        </div>
      </div>
    </div>
  )
}

function NotesSection({ subject }) {
  return (
    <div className="h-full p-4 space-y-3 text-sm text-slate-700">
      <p className="font-medium">
        Quick notes for {subject.name} (editable in a real app):
      </p>
      <ul className="list-disc list-inside space-y-1">
        <li>Summarize key definitions and theorems.</li>
        <li>Write down important example problems and solutions.</li>
        <li>Note common mistakes or patterns to watch out for.</li>
      </ul>
      <p className="text-xs text-slate-500 mt-2">
        Tip: In a production app this area could be a rich text editor with
        autosave and version history.
      </p>
    </div>
  )
}

function PracticeSection({ subject }) {
  return (
    <div className="h-full p-4 space-y-3 text-sm text-slate-700">
      <p className="font-medium">
        Practice ideas for {subject.name} (UI only):
      </p>
      <ol className="list-decimal list-inside space-y-1">
        <li>Create a set of practice questions or flashcards.</li>
        <li>Track how confident you feel about each topic.</li>
        <li>Ask the AI to generate new questions at different difficulty.</li>
      </ol>
      <p className="text-xs text-slate-500 mt-2">
        In a real implementation this section could show interactive quizzes,
        progress charts, and spaced repetition suggestions.
      </p>
    </div>
  )
}

function AiHelpSection({ subject, messages, onSendMessage }) {
  return (
    <div className="flex flex-col h-[320px] sm:h-[380px]">
      <div className="flex-1 overflow-hidden border-b border-slate-100">
        <ChatMessageList messages={messages} />
      </div>
      <div className="p-3">
        <ChatInput
          placeholder={`Ask the AI about ${subject.name.toLowerCase()}…`}
          onSend={onSendMessage}
        />
      </div>
    </div>
  )
}

