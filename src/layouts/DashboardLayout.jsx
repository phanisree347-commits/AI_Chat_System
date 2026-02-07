import { useState } from 'react'
import Sidebar from '../components/navigation/Sidebar.jsx'
import SubjectsPage from '../pages/dashboard/SubjectsPage.jsx'
import SubjectDetailPage from '../pages/subjects/SubjectDetailPage.jsx'
import AiChatPage from '../pages/chat/AiChatPage.jsx'
import CollaborativeRoomPage from '../pages/rooms/CollaborativeRoomPage.jsx'

// Main app shell shown after "login".
// Handles sidebar navigation and which main section is visible.
export default function DashboardLayout({ user, onLogout }) {
  // Which section of the dashboard is active in the main content area.
  const [activeSection, setActiveSection] = useState('subjects')

  // Track which subject card was last selected, so we can show its detail view.
  const [selectedSubject, setSelectedSubject] = useState(null)

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject)
    setActiveSection('subject-detail')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar (collapsible on small screens inside the component) */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        user={user}
        onLogout={onLogout}
      />

      {/* Main content area */}
      <main className="flex-1 min-w-0">
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
          <header className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                {getSectionTitle(activeSection, selectedSubject)}
              </h2>
              <p className="text-sm text-slate-500">
                Chat in subject-based rooms with AI-assisted context and notes.
              </p>
            </div>
          </header>

          <section className="bg-white border border-slate-100 rounded-2xl shadow-sm shadow-slate-200/60 p-4 sm:p-6 min-h-[60vh]">
            {activeSection === 'subjects' && (
              <SubjectsPage onSelectSubject={handleSelectSubject} />
            )}

            {activeSection === 'subject-detail' && selectedSubject && (
              <SubjectDetailPage
                subject={selectedSubject}
                onBack={() => setActiveSection('subjects')}
              />
            )}

            {activeSection === 'ai-chat' && <AiChatPage />}

            {activeSection === 'rooms' && <CollaborativeRoomPage />}

            {activeSection === 'profile' && (
              <PlaceholderSection
                title="Profile"
                description="Profile management UI can go here."
              />
            )}

            {activeSection === 'settings' && (
              <PlaceholderSection
                title="Settings"
                description="Global settings for the platform can go here."
              />
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

function PlaceholderSection({ title, description }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center text-slate-500">
      <h3 className="text-lg font-medium text-slate-900 mb-2">{title}</h3>
      <p className="max-w-md text-sm">{description}</p>
    </div>
  )
}

function getSectionTitle(activeSection, selectedSubject) {
  switch (activeSection) {
    case 'subjects':
      return 'Subjects'
    case 'subject-detail':
      return selectedSubject?.name || 'Subject'
    case 'ai-chat':
      return 'AI Study Assistant'
    case 'rooms':
      return 'Collaborative Rooms'
    case 'profile':
      return 'Your Profile'
    case 'settings':
      return 'Settings'
    default:
      return 'Dashboard'
  }
}

