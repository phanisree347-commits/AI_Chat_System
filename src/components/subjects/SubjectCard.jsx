// Compact card for a subject in the dashboard grid.
export default function SubjectCard({ subject, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col h-full rounded-2xl border border-slate-100 bg-white px-4 py-4 text-left shadow-sm shadow-slate-200/60 transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      <div
        className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr ${subject.color} text-white text-sm font-semibold`}
      >
        {subject.name[0]}
      </div>
      <div className="flex-1 space-y-1">
        <h4 className="text-sm font-semibold text-slate-900 group-hover:text-slate-950">
          {subject.name}
        </h4>
        <p className="text-xs font-medium text-slate-500">{subject.level}</p>
        <p className="mt-1 text-xs text-slate-500 line-clamp-3">
          {subject.description}
        </p>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>Chat · Notes · AI Assist</span>
        <span className="font-medium text-indigo-600 group-hover:text-indigo-700">
          Open →
        </span>
      </div>
    </button>
  )
}

