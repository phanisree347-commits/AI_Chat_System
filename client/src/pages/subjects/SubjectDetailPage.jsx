import { useState } from 'react'
import PrimaryButton from '../../components/common/PrimaryButton.jsx'
import ChatMessageList from '../../components/chat/ChatMessageList.jsx'
import ChatInput from '../../components/chat/ChatInput.jsx'
import { useDemoChat } from '../../hooks/useDemoChat.js'
import NotesSection from './NotesSection.jsx'
import PracticeSectionPage from './PracticeSectionPage.jsx'

const TABS = [
  { id: 'notes', label: 'Notes' },
  { id: 'practice', label: 'Practice' },
  { id: 'ai', label: 'Chat' },
]

export default function SubjectDetailPage({ subject, onBack }) {

  const [activeTab, setActiveTab] = useState('notes')

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

      {/* HEADER */}
      <Header subject={subject} onBack={onBack} />

      {/* MAIN CONTAINER */}
      <div className="flex flex-col h-full border border-slate-100 rounded-2xl">

        {/* TABS */}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* CONTENT */}
        <div className="flex-1 rounded-b-2xl bg-white">

          {activeTab === 'notes' && (
            <NotesSection subject={subject} />
          )}

          {activeTab === 'practice' && (
            <PracticeSection subject={subject} />
          )}

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

function Header({ subject, onBack }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">

      <div className="flex items-center gap-3">

        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 shadow-sm hover:bg-slate-50"
        >
          ← Back
        </button>

        <div>
          <p className="text-xs font-medium text-slate-500">
            Subject learning room
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
  )
}

function TabNavigation({ activeTab, setActiveTab }) {
  return (
    <div className="flex border-b border-slate-100 bg-slate-50/80 rounded-t-2xl px-3 py-2 gap-2">

      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition
          ${
            activeTab === tab.id
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-white'
          }`}
        >
          {tab.label}
        </button>
      ))}

    </div>
  )
}

function PracticeSection({ subject }) {
  return (<PracticeSectionPage subject={subject} />)
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