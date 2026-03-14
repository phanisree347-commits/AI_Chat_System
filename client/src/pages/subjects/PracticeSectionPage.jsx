import { useState } from "react"

function PracticeSectionPage({ subject }) {

  const [topic, setTopic] = useState("")
  const [questions, setQuestions] = useState("")
  const [loading, setLoading] = useState(false)

  const generatePractice = async () => {

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
          message: `Generate practice questions for the topic "${topic}" in the subject ${subject.name}.

Include:
- 3 basic questions
- 2 intermediate questions
- 1 challenging question
Provide clear questions only.`
        })
      })

      const data = await res.json()

      setQuestions(data.reply)

    } catch (error) {

      console.error(error)
      setQuestions("Failed to generate practice questions")

    } finally {

      setLoading(false)

    }
  }

  return (

    <div className="h-full p-5 space-y-4 text-sm text-slate-700">

      <h4 className="font-semibold text-slate-900">
        Practice Exercises for {subject.name}
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
          onClick={generatePractice}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
        >
          Generate
        </button>

      </div>

      {/* Loading */}
      {loading && (
        <p className="text-slate-500">Generating practice questions...</p>
      )}

      {/* Questions */}
      {!loading && (
        <div className="bg-slate-50 p-4 rounded-xl whitespace-pre-wrap min-h-[120px]">

          {questions || "Enter a topic and click Generate to create practice questions."}

        </div>
      )}

    </div>

  )
}

export default PracticeSectionPage