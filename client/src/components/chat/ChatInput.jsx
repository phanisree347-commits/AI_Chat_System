import { useState } from 'react'
import PrimaryButton from '../common/PrimaryButton.jsx'

export default function ChatInput({ placeholder, onSend, disabled = false }) {
  const [value, setValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (disabled) return

    const trimmed = value.trim()
    if (!trimmed) return

    onSend(trimmed)
    setValue('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit(event)
    }
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
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 resize-none border-0 bg-transparent px-0 py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 disabled:opacity-50"
      />

      <PrimaryButton
        type="submit"
        className="px-3 py-1.5 text-xs"
        disabled={disabled || !value.trim()}
      >
        Send
      </PrimaryButton>
    </form>
  )
}