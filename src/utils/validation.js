// Very small, beginner-friendly validation helpers.
// Keeping these in a utils file means we can reuse them in
// multiple forms without repeating the logic.

export function validateRequired(value) {
  return String(value || '').trim().length > 0
}

export function validateEmail(value) {
  const email = String(value || '').trim()
  if (!email) return false

  // Simple regex that is "good enough" for UI validation.
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(email)
}

