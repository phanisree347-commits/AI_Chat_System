import { useState } from 'react'

const NAV_ITEMS = [
  { id: 'subjects', label: 'Subjects' },
  { id: 'ai-chat', label: 'AI Chat' },
  { id: 'rooms', label: 'Collaborative Rooms' },
  { id: 'profile', label: 'Profile' },
  { id: 'settings', label: 'Settings' },
]

// Reusable small button component for the sidebar and other places.
function NavButton({ isActive, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 w-full rounded-xl px-3 py-2 text-sm font-medium transition
        ${isActive ? 'bg-slate-900 text-slate-50 shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
    >
      <span className="inline-flex h-2 w-2 rounded-full bg-gradient-to-tr from-indigo-400 to-sky-400" />
      <span>{label}</span>
    </button>
  )
}

export default function Sidebar({ activeSection, onSectionChange, user, onLogout }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleSelect = (id) => {
    onSectionChange(id)
    setIsMobileOpen(false)
  }

  return (
    <>
      {/* Mobile top bar with menu button */}
      <div className="lg:hidden fixed inset-x-0 top-0 z-20 bg-white border-b border-slate-100">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="text-sm font-medium text-slate-900">
              AI Chat System
            </p>
            <p className="text-xs text-slate-500 truncate">
              {user?.name || 'Guest learner'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            {isMobileOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        {isMobileOpen && (
          <div className="border-t border-slate-100 bg-white px-3 pb-3 space-y-2">
            {NAV_ITEMS.map((item) => (
              <NavButton
                key={item.id}
                label={item.label}
                isActive={activeSection === item.id}
                onClick={() => handleSelect(item.id)}
              />
            ))}
            <button
              type="button"
              onClick={onLogout}
              className="w-full mt-1 rounded-xl px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r lg:border-slate-100 lg:bg-white lg:shadow-sm">
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-slate-100">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              AI Chat System
            </p>
            <p className="text-xs text-slate-500">
              {user?.name || 'Guest learner'}
            </p>
          </div>
          <span className="inline-flex items-center justify-center rounded-full bg-slate-900 text-white text-xs h-7 w-7">
            {user?.name?.[0]?.toUpperCase() || 'A'}
          </span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavButton
              key={item.id}
              label={item.label}
              isActive={activeSection === item.id}
              onClick={() => handleSelect(item.id)}
            />
          ))}
        </nav>

        <div className="px-4 pb-4">
          <button
            type="button"
            onClick={onLogout}
            className="w-full rounded-xl px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}

