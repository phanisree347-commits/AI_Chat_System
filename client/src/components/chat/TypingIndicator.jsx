export default function TypingIndicator({ users }) {
  if (!users || users.length === 0) return null

  const names = users.map((u) => u.name).join(', ')

  return (
    <div className="px-3 py-1 text-xs text-slate-500 flex items-center gap-2">
      <span className="inline-flex gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.2s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
      </span>
      <span>{names} typing…</span>
    </div>
  )
}

