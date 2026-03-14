import { useEffect, useMemo, useState } from 'react'
import PrimaryButton from '../../components/common/PrimaryButton.jsx'
import { SUBJECTS } from '../../utils/subjects.js'

const AI_RESPONSE_MODES = [
  { value: 'concise', label: 'Concise' },
  { value: 'detailed', label: 'Detailed' },
  { value: 'exam', label: 'Exam-Oriented' },
]

export default function SettingsPage() {
  const storedUser = useMemo(() => {
    try {
      const raw = localStorage.getItem('user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  }, [])

  // Account Settings
  const [fullName, setFullName] = useState(storedUser?.name || '')
  const [email] = useState(storedUser?.email || 'user@example.com')
  const [isAccountSaving, setIsAccountSaving] = useState(false)

  // AI Preferences
  const [aiMode, setAiMode] = useState('concise')
  const [defaultSubjectId, setDefaultSubjectId] = useState(SUBJECTS[0]?.id || '')
  const [enableAiSuggestions, setEnableAiSuggestions] = useState(true)
  const [isPrefsSaving, setIsPrefsSaving] = useState(false)

  // Notifications
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [roomActivityAlerts, setRoomActivityAlerts] = useState(true)
  const [assignmentReminders, setAssignmentReminders] = useState(false)

  // Collaboration
  const [allowInvites, setAllowInvites] = useState(true)
  const [showOnlineStatus, setShowOnlineStatus] = useState(true)

  // Theme (UI only)
  const [theme, setTheme] = useState('light') // 'light' | 'dark'

  // Modals
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')

  // Toast
  const [toast, setToast] = useState(null) // { type: 'success' | 'error', message: string }

  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(id)
  }, [toast])

  const pageShell =
    theme === 'dark'
      ? 'bg-slate-900 text-slate-100 border-slate-800'
      : 'bg-slate-50 text-slate-900 border-slate-100'

  const cardShell =
    theme === 'dark'
      ? 'bg-slate-950 border-slate-800 shadow-black/20'
      : 'bg-white border-slate-100 shadow-slate-200/60'

  const subtleText = theme === 'dark' ? 'text-slate-300' : 'text-slate-500'
  const inputShell =
    theme === 'dark'
      ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500'
      : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400'

  const handleSaveAccount = async () => {
    if (!fullName.trim()) {
      setToast({ type: 'error', message: 'Full name is required.' })
      return
    }

    setIsAccountSaving(true)
    try {
      // UI only: simulate save latency.
      await sleep(700)
      setToast({ type: 'success', message: 'Account settings saved.' })
    } finally {
      setIsAccountSaving(false)
    }
  }

  const handleSavePreferences = async () => {
    setIsPrefsSaving(true)
    try {
      await sleep(700)
      setToast({ type: 'success', message: 'AI preferences saved.' })
    } finally {
      setIsPrefsSaving(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (deleteConfirmText.trim().toUpperCase() !== 'DELETE') {
      setToast({ type: 'error', message: "Type DELETE to confirm." })
      return
    }

    // UI only: simulate delete.
    await sleep(700)
    setIsDeleteOpen(false)
    setDeleteConfirmText('')
    setToast({ type: 'success', message: 'Account deletion requested (UI only).' })
  }

  const subjectOptions = SUBJECTS.map((s) => ({ value: s.id, label: s.name }))

  return (
    <div className={`rounded-2xl border ${pageShell} p-4 sm:p-6`}>
      <div className="space-y-6">
        <header className="space-y-1">
          <h3 className="text-xl font-semibold tracking-tight">Settings</h3>
          <p className={`text-sm ${subtleText}`}>
            Manage your account, AI behavior, notifications, collaboration, and theme.
          </p>
        </header>

        <div className="grid gap-6">
          {/* Account Settings */}
          <Card title="Account Settings" subtitle="Update your basic profile details." cardShell={cardShell} subtleText={subtleText}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full Name">
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 ${inputShell}`}
                  placeholder="Your name"
                />
              </Field>

              <Field label="Email (read-only)">
                <input
                  value={email}
                  readOnly
                  className={`w-full rounded-xl border px-3 py-2 text-sm opacity-80 cursor-not-allowed ${inputShell}`}
                />
              </Field>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsChangePasswordOpen(true)}
                className={`inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  theme === 'dark'
                    ? 'border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-100'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                Change Password
              </button>

              <PrimaryButton
                onClick={handleSaveAccount}
                disabled={isAccountSaving}
                className="px-5"
              >
                {isAccountSaving ? 'Saving…' : 'Save Changes'}
              </PrimaryButton>
            </div>
          </Card>

          {/* AI Preferences */}
          <Card title="AI Preferences" subtitle="Customize how the AI assists you." cardShell={cardShell} subtleText={subtleText}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                label="AI Response Mode"
                value={aiMode}
                onChange={setAiMode}
                options={AI_RESPONSE_MODES}
                inputShell={inputShell}
              />
              <Select
                label="Default Subject Selection"
                value={defaultSubjectId}
                onChange={setDefaultSubjectId}
                options={subjectOptions}
                inputShell={inputShell}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
              <ToggleRow
                label="Enable AI Suggestions"
                description="Show smart prompts and next-step suggestions in rooms."
                checked={enableAiSuggestions}
                onChange={setEnableAiSuggestions}
                theme={theme}
              />
              <PrimaryButton
                onClick={handleSavePreferences}
                disabled={isPrefsSaving}
                className="px-5"
              >
                {isPrefsSaving ? 'Saving…' : 'Save Preferences'}
              </PrimaryButton>
            </div>
          </Card>

          {/* Notifications */}
          <Card title="Notification Settings" subtitle="Choose which updates you receive." cardShell={cardShell} subtleText={subtleText}>
            <div className="grid gap-3">
              <ToggleRow
                label="Email Notifications"
                description="Get important account and learning updates by email."
                checked={emailNotifications}
                onChange={setEmailNotifications}
                theme={theme}
              />
              <ToggleRow
                label="Room Activity Alerts"
                description="Be notified when there is activity in your rooms."
                checked={roomActivityAlerts}
                onChange={setRoomActivityAlerts}
                theme={theme}
              />
              <ToggleRow
                label="Assignment Reminders"
                description="Reminders for practice tasks and upcoming goals."
                checked={assignmentReminders}
                onChange={setAssignmentReminders}
                theme={theme}
              />
            </div>
          </Card>

          {/* Collaboration */}
          <Card title="Collaboration Settings" subtitle="Control how others can interact with you." cardShell={cardShell} subtleText={subtleText}>
            <div className="grid gap-3">
              <ToggleRow
                label="Allow others to invite me"
                description="Let people invite you to new collaborative rooms."
                checked={allowInvites}
                onChange={setAllowInvites}
                theme={theme}
              />
              <ToggleRow
                label="Show online status"
                description="Display your online presence in rooms."
                checked={showOnlineStatus}
                onChange={setShowOnlineStatus}
                theme={theme}
              />
            </div>
          </Card>

          {/* Theme */}
          <Card title="Theme Settings" subtitle="Toggle between light and dark mode." cardShell={cardShell} subtleText={subtleText}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium">Light / Dark Mode</p>
                <p className={`text-xs ${subtleText}`}>
                  This is UI-only for now (no persistence).
                </p>
              </div>
              <Toggle
                checked={theme === 'dark'}
                onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                theme={theme}
              />
            </div>
          </Card>

          {/* Danger Zone */}
          <div className={`rounded-2xl border p-6 ${cardShell} border-red-200`}>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-red-700">Danger Zone</h4>
              <p className="text-xs text-slate-500">
                Permanent actions. Please proceed carefully.
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="text-sm">
                <p className="font-medium text-slate-900">Delete Account</p>
                <p className="text-xs text-slate-500">
                  This will remove your profile and room history.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsDeleteOpen(true)}
                className="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div
            className={`rounded-2xl border px-4 py-3 shadow-lg text-sm ${
              toast.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}

      {/* Change password modal (UI only) */}
      {isChangePasswordOpen && (
        <Modal title="Change Password" onClose={() => setIsChangePasswordOpen(false)}>
          <div className="space-y-3">
            <p className="text-sm text-slate-500">
              UI only. Password update will be connected to backend later.
            </p>
            <PrimaryButton
              onClick={() => {
                setIsChangePasswordOpen(false)
                setToast({ type: 'success', message: 'Password change requested (UI only).' })
              }}
              className="w-full"
            >
              Continue
            </PrimaryButton>
          </div>
        </Modal>
      )}

      {/* Delete account modal */}
      {isDeleteOpen && (
        <Modal title="Confirm Delete Account" onClose={() => setIsDeleteOpen(false)}>
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Type <span className="font-semibold">DELETE</span> to confirm.
            </p>
            <input
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400"
              placeholder="DELETE"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

function Card({ title, subtitle, children, cardShell, subtleText }) {
  return (
    <section className={`rounded-2xl border p-6 shadow-sm ${cardShell}`}>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className={`text-xs ${subtleText}`}>{subtitle}</p>
      </div>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  )
}

function Field({ label, children }) {
  return (
    <label className="space-y-1">
      <span className="block text-xs font-medium text-slate-600">{label}</span>
      {children}
    </label>
  )
}

function Select({ label, value, onChange, options, inputShell }) {
  return (
    <label className="space-y-1">
      <span className="block text-xs font-medium text-slate-600">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 ${inputShell}`}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}

function ToggleRow({ label, description, checked, onChange, theme }) {
  const text = theme === 'dark' ? 'text-slate-200' : 'text-slate-900'
  const sub = theme === 'dark' ? 'text-slate-400' : 'text-slate-500'

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className={`text-sm font-medium ${text}`}>{label}</p>
        <p className={`text-xs ${sub}`}>{description}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} theme={theme} />
    </div>
  )
}

function Toggle({ checked, onChange, theme }) {
  const trackOn = theme === 'dark' ? 'bg-indigo-500' : 'bg-slate-900'
  const trackOff = theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'

  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? trackOn : trackOff
      }`}
      aria-pressed={checked}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl border border-slate-100">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-500 hover:text-slate-700"
          >
            Close
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

