// Header for a chat room showing the room name and basic status.
export default function RoomChatHeader({ room, memberCount }) {
  if (!room) return null

  return (
    <header className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-slate-100 bg-slate-50/70">
      <div>
        <p className="text-xs font-medium text-slate-500">Room</p>
        <h3 className="text-sm font-semibold text-slate-900">
          {room.name}
        </h3>
      </div>
      <p className="text-xs text-slate-500">
        {room.subject} · {memberCount} members online
      </p>
    </header>
  )
}

