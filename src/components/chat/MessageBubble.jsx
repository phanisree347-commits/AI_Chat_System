// Single chat message bubble. Kept intentionally small and presentational.
// The parent component decides what counts as "own" vs "other" messages.
export default function MessageBubble({ message, isOwn }) {
  const alignmentClass = isOwn ? 'justify-end' : 'justify-start'
  const bubbleClass = isOwn
    ? 'bg-slate-900 text-slate-50 rounded-br-sm'
    : 'bg-white text-slate-800 border border-slate-100 rounded-bl-sm'

  return (
    <div className={`flex ${alignmentClass}`}>
      <article
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs sm:text-sm shadow-sm ${bubbleClass}`}
      >
        {!isOwn && (
          <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 mb-0.5">
            {message.authorName}
          </p>
        )}
        <p>{message.text}</p>
        <p className="mt-1 text-[10px] text-slate-400">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </article>
    </div>
  )
}

