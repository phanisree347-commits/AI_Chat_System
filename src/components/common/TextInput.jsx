// Small, reusable text input with label + error message.
// This keeps our forms consistent across the app.
export default function TextInput({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
}) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full rounded-xl border bg-white px-3 py-2 text-sm shadow-sm outline-none transition
          ${
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
              : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
          }`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

