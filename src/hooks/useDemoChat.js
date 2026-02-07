import { useState } from 'react'

// Small helper hook that contains the "demo chat" logic used in
// both the global AI chat page and the subject-specific AI help.
// Keeping it here avoids repeating the same send + reply logic.
export function useDemoChat({
  initialMessages,
  replyText,
  replyDelayMs = 600,
}) {
  const [messages, setMessages] = useState(initialMessages)

  const handleSend = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: trimmed,
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulated AI reply. In a real app, replace this with a call
    // to your backend or AI API.
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          text: replyText,
        },
      ])
    }, replyDelayMs)
  }

  return { messages, handleSend }
}

