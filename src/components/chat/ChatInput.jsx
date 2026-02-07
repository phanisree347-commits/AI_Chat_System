import { useState } from 'react'
import PrimaryButton from '../common/PrimaryButton.jsx'

// Text input + send button used by both the global AI chat
// and the subject-specific AI help.
export default function ChatInput({ placeholder, onSend }) {
  const [value, setValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!value.trim()) return

    onSend(value.trim())
    setValue('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm"
    >
      <textarea
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 resize-none border-0 bg-transparent px-0 py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0"
      />
      <PrimaryButton
        type="submit"
        className="px-3 py-1.5 text-xs"
        disabled={!value.trim()}
      >
        Send
      </PrimaryButton>
    </form>
  )
}

