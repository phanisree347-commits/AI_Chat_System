import { useState } from 'react'
import PrimaryButton from '../../components/common/PrimaryButton.jsx'
import RoomChatHeader from '../../components/chat/RoomChatHeader.jsx'
import RoomMessagesList from '../../components/chat/RoomMessagesList.jsx'
import RoomMessageInput from '../../components/chat/RoomMessageInput.jsx'
import { sendMessageToRoom } from '../../services/chatService.js'

const MOCK_ROOMS = [
  {
    id: 'room-1',
    name: 'Algebra problem solving',
    subject: 'Mathematics',
    members: 3,
  },
  {
    id: 'room-2',
    name: 'Intro to JavaScript',
    subject: 'Programming',
    members: 5,
  },
  {
    id: 'room-3',
    name: 'Exam revision: Physics',
    subject: 'Science',
    members: 2,
  },
]

// Collaborative room UI: room list + chat + shared notes.
// This component keeps all "room-level" state (active room, messages per room)
// and passes data down into small presentational components.
export default function CollaborativeRoomPage() {
  const [rooms] = useState(MOCK_ROOMS)
  const [activeRoomId, setActiveRoomId] = useState(rooms[0]?.id || null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Temporary mock "logged in" user for this page only.
  const currentUser = { id: 'user-1', name: 'Alex Student' }

  // Messages are stored per room so switching rooms shows different chats.
  const [messagesByRoom, setMessagesByRoom] = useState({})

  const activeRoom = rooms.find((room) => room.id === activeRoomId) || null
  const activeRoomMessages = activeRoom
    ? messagesByRoom[activeRoom.id] || []
    : []

  const handleSelectRoom = (roomId) => {
    setActiveRoomId(roomId)
  }

  const handleSendMessage = async (text) => {
    if (!activeRoom) return

    const newMessage = {
      id: String(Date.now()),
      roomId: activeRoom.id,
      userId: currentUser.id,
      authorName: currentUser.name,
      text,
      createdAt: new Date().toISOString(),
    }

    // Update local UI state immediately so the chat feels responsive.
    setMessagesByRoom((previous) => {
      const previousMessages = previous[activeRoom.id] || []
      return {
        ...previous,
        [activeRoom.id]: [...previousMessages, newMessage],
      }
    })

    // In the future, send this to your backend / Socket.io server.
    // We ignore the result for now, but this is where you might show
    // error toasts or retry logic.
    await sendMessageToRoom(activeRoom.id, newMessage)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full">
      {/* Room list */}
      <section className="lg:w-72 flex-shrink-0 border border-slate-100 rounded-2xl bg-white p-3 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">
            Available rooms
          </h3>
          <PrimaryButton
            className="text-xs px-3 py-1.5"
            onClick={() => setIsModalOpen(true)}
          >
            New room
          </PrimaryButton>
        </div>

        <div className="space-y-2">
          {rooms.map((room) => (
            <button
              key={room.id}
              type="button"
              onClick={() => handleSelectRoom(room.id)}
              className={`w-full rounded-xl border px-3 py-2 text-left text-xs transition
                ${
                  activeRoomId === room.id
                    ? 'border-slate-900 bg-slate-900 text-slate-50'
                    : 'border-slate-100 bg-slate-50/80 text-slate-700 hover:bg-slate-100'
                }`}
            >
              <p className="font-medium truncate">{room.name}</p>
              <p
                className={`mt-0.5 ${
                  activeRoomId === room.id
                    ? 'text-slate-200'
                    : 'text-slate-500'
                }`}
              >
                {room.subject} · {room.members} members
              </p>
            </button>
          ))}

          {rooms.length === 0 && (
            <p className="text-xs text-slate-500">
              No rooms yet. Create one to start collaborating.
            </p>
          )}
        </div>
      </section>

      {/* Chat + shared notes panel */}
      <section className="flex-1 min-w-0 border border-slate-100 rounded-2xl bg-white p-3 flex flex-col gap-3">
        {activeRoom ? (
          <>
            <RoomChatHeader
              room={activeRoom}
              memberCount={activeRoom.members}
            />

            <div className="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 gap-3 flex-1 min-h-[260px]">
              <section className="flex flex-col border border-slate-100 rounded-2xl overflow-hidden">
                <div className="px-3 py-2 border-b border-slate-100 bg-slate-50/60 text-xs font-medium text-slate-600">
                  Chat
                </div>
                <RoomMessagesList
                  messages={activeRoomMessages}
                  currentUserId={currentUser.id}
                />
                <RoomMessageInput onSend={handleSendMessage} />
              </section>

              <section className="flex flex-col border border-slate-100 rounded-2xl overflow-hidden">
                <div className="px-3 py-2 border-b border-slate-100 bg-slate-50/60 text-xs font-medium text-slate-600">
                  Shared notes
                </div>
                <textarea
                  className="flex-1 w-full border-0 text-xs p-3 resize-none focus:outline-none focus:ring-0"
                  placeholder="Shared notes for this room. Everyone can add key ideas, links, and summaries here."
                />
              </section>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-xs text-slate-500">
            Select a room from the list or create a new one.
          </div>
        )}
      </section>

      {isModalOpen && (
        <RoomModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}

function RoomModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/30 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl border border-slate-100 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">
            Create or join a room
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-500 hover:text-slate-700"
          >
            Close
          </button>
        </div>

        <p className="text-xs text-slate-500">
          This modal is just UI. In a full app you would add logic to create a
          new room or join an existing one on your backend.
        </p>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-700">
            Room name
          </label>
          <input
            type="text"
            placeholder="Study session name"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
          />
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <PrimaryButton className="px-3 py-1.5 text-xs">
            Continue
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

