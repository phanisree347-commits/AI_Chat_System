import { useState } from "react"

export default function NotesSection({ subject }) {

  const [topic, setTopic] = useState("")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)

  const generateNotes = async () => {

    if (!topic.trim()) {
      alert("Please enter a topic")
      return
    }

    try {

      setLoading(true)

      const res = await fetch("http://localhost:5000/api/ai/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: `Generate clear beginner study notes for the topic "${topic}" in the subject ${subject.name}.
Include:
- key concepts
- definitions
- formulas if applicable
- simple examples`
        })
      })

      const data = await res.json()

      setNotes(data.reply)

    } catch (error) {

      console.error(error)
      setNotes("Failed to generate notes")

    } finally {

      setLoading(false)

    }
  }

  return (

    <div className="h-full p-5 space-y-4 text-sm text-slate-700">

      <h4 className="font-semibold text-slate-900">
        Generate Study Notes for {subject.name}
      </h4>

      {/* Topic Input */}
      <div className="flex gap-2">

        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic (example: Derivatives)"
          className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm"
        />

        <button
          onClick={generateNotes}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
        >
          Generate
        </button>

      </div>

      {/* Loading */}
      {loading && (
        <p className="text-slate-500">Generating notes...</p>
      )}

      {/* Notes Output */}
      {!loading && (
        <div className="bg-slate-50 p-4 rounded-xl whitespace-pre-wrap min-h-[120px]">

          {notes || "Enter a topic and click Generate to create notes."}

        </div>
      )}

    </div>
  )
}