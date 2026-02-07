import { useState } from 'react'
import PrimaryButton from '../common/PrimaryButton.jsx'

// Message input specifically for room chat.
// It owns only the input field state; the parent provides onSend.
export default function RoomMessageInput({ onSend }) {
  const [value, setValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmed = value.trim()
    if (!trimmed) return // prevent empty messages

    onSend(trimmed)
    setValue('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 px-3 py-2 border-t border-slate-100 bg-slate-50/70"
      aria-label="Send message to room"
    >
      <textarea
        rows={1}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Type a message to your group…"
        className="flex-1 resize-none rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
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

