export default function OnlineUserList({ users }) {
  return (
    <aside className="border border-slate-100 rounded-2xl bg-white p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-slate-700">Online users</span>
        <span className="text-slate-400">{users.length}</span>
      </div>
      <div className="space-y-1 text-xs">
        {users.length === 0 ? (
          <p className="text-slate-500">No one is online yet.</p>
        ) : (
          users.map((u) => (
            <div
              key={u.id}
              className="flex items-center gap-2 text-slate-700"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>{u.name}</span>
            </div>
          ))
        )}
      </div>
    </aside>
  )
}

