import { useState } from 'react'
import TextInput from '../../components/common/TextInput.jsx'
import PrimaryButton from '../../components/common/PrimaryButton.jsx'
import { validateEmail, validateRequired } from '../../utils/validation.js'

// Basic login form with very lightweight client-side validation.
// This component is UI-only: it does not talk to a real backend.
export default function LoginPage({ onSwitchToRegister, onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    // Simple validation rules for beginners:
    const nextErrors = {}
    if (!validateRequired(email)) {
      nextErrors.email = 'Email is required.'
    } else if (!validateEmail(email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!validateRequired(password)) {
      nextErrors.password = 'Password is required.'
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }

    // If we found any errors, show them and stop.
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    // In a real app this is where we would call an API.
    // To keep the UI snappy but still realistic, we simulate
    // a short network delay with setTimeout.
    setTimeout(() => {
      onLoginSuccess({
        name: 'AI Learner',
        email,
      })
      setIsSubmitting(false)
    }, 600)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-900">
          Welcome back to your chat rooms
        </h2>
        <p className="text-sm text-slate-500">
          Sign in to continue chatting with your study groups and AI assistant.
        </p>
      </div>

      <TextInput
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        error={errors.email}
      />

      <TextInput
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        error={errors.password}
      />

      <PrimaryButton
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing in…' : 'Sign in'}
      </PrimaryButton>

      <p className="text-xs text-slate-500 text-center">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
        >
          Create one
        </button>
      </p>
    </form>
  )
}

