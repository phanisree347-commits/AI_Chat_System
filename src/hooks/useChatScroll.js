import { useEffect, useRef } from 'react'

// Small custom hook that automatically scrolls a container
// to the bottom whenever the messages array changes.
// This mimics the "always show latest message" behavior
// commonly seen in chat apps.
export function useChatScroll(messages) {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Using requestAnimationFrame ensures the DOM is updated
    // before we try to scroll.
    window.requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight
    })
  }, [messages])

  return containerRef
}

