import { useEffect, useState } from 'react'
import { fetchRooms, createRoom } from '../../services/roomService.js'
import RoomChat from './RoomChat.jsx'
import PrimaryButton from '../../components/common/PrimaryButton.jsx'

export default function Rooms({ onRequireLogin }) {
  const [rooms, setRooms] = useState([])
  const [selectedRoomId, setSelectedRoomId] = useState(null)
  const [newSubject, setNewSubject] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      onRequireLogin?.()
      return
    }

    let cancelled = false

    async function load() {
      try {
        setIsLoading(true)
        setError('')
        const data = await fetchRooms()
        if (cancelled) return
        setRooms(data.rooms || [])
        if (!selectedRoomId && data.rooms?.[0]) {
          setSelectedRoomId(String(data.rooms[0].id))
        }
      } catch (err) {
        if (cancelled) return
        setError(err.message || 'Failed to load rooms')
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [onRequireLogin, selectedRoomId])

  const handleCreateRoom = async (event) => {
    event.preventDefault()
    const subject = newSubject.trim()
    if (!subject) return

    try {
      const data = await createRoom({ name: subject })
      const createdRoom = data.room

      setRooms((prev) => [createdRoom, ...prev])
      setSelectedRoomId(String(createdRoom.id))
      setNewSubject('')
    } catch (err) {
      setError(err.message || 'Failed to create room')
    }
  }

  const activeRoom = rooms.find((r) => String(r.id) === selectedRoomId) || null

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full">
      <section className="lg:w-72 flex-shrink-0 border border-slate-100 rounded-2xl bg-white p-3 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">
            Subject rooms
          </h3>
        </div>

        <form onSubmit={handleCreateRoom} className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="New subject (e.g. Algebra)"
              className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
            />
            <PrimaryButton type="submit" className="px-3 py-1.5 text-xs">
              Create
            </PrimaryButton>
          </div>
        </form>

        {isLoading ? (
          <p className="text-xs text-slate-500 mt-2">Loading rooms…</p>
        ) : error ? (
          <p className="text-xs text-red-600 mt-2">{error}</p>
        ) : (
          <div className="space-y-2 mt-2">
            {rooms.length === 0 ? (
              <p className="text-xs text-slate-500">
                No rooms yet. Create one to start collaborating.
              </p>
            ) : (
              rooms.map((room) => (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => setSelectedRoomId(String(room.id))}
                  className={`w-full rounded-xl border px-3 py-2 text-left text-xs transition
                    ${
                      String(room.id) === selectedRoomId
                        ? 'border-slate-900 bg-slate-900 text-slate-50'
                        : 'border-slate-100 bg-slate-50/80 text-slate-700 hover:bg-slate-100'
                    }`}
                >
                  <p className="font-medium truncate">{room.subject}</p>
                  <p
                    className={`mt-0.5 ${
                      String(room.id) === selectedRoomId
                        ? 'text-slate-200'
                        : 'text-slate-500'
                    }`}
                  >
                    {room.participantsCount} active ·{' '}
                    {room.lastActivity
                      ? new Date(room.lastActivity).toLocaleTimeString()
                      : '—'}
                  </p>
                </button>
              ))
            )}
          </div>
        )}
      </section>

      <section className="flex-1 min-w-0">
        {activeRoom ? (
          <RoomChat room={activeRoom} onRequireLogin={onRequireLogin} />
        ) : (
          <div className="h-full flex items-center justify-center text-xs text-slate-500">
            Select or create a room to start chatting.
          </div>
        )}
      </section>
    </div>
  )
}

