import { useState } from 'react'

const API_BASE = "http://localhost:5000/api"

export function useDemoChat({ initialMessages }) {
  const [messages, setMessages] = useState(initialMessages)
  const [loading, setLoading] = useState(false)

  const handleSend = async (text) => {
    const trimmed = text.trim()

    if (!trimmed || loading) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: trimmed,
    }

    setMessages(prev => [...prev, userMessage])
    setLoading(true)

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 2000000)

      const response = await fetch(`${API_BASE}/ai/ask`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ message: trimmed }),
  signal: controller.signal,
})

const data = await response.json()

const aiMessage = {
  id: Date.now() + 1,
  role: 'assistant',
  text: data?.reply || "No response from AI",
}
      setMessages(prev => [...prev, aiMessage])

    } catch (err) {
      console.error("AI ERROR:", err)

      const errorMessage = {
        id: Date.now() + 2,
        role: 'assistant',
        text:
          err.name === "AbortError"
            ? "⏳ AI response timed out"
            : "⚠ Error contacting AI server",
      }

      setMessages(prev => [...prev, errorMessage])

    } finally {
      setLoading(false)
    }
  }

  return { messages, handleSend, loading }
}