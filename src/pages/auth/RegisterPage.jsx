import { useState } from 'react'
import TextInput from '../../components/common/TextInput.jsx'
import PrimaryButton from '../../components/common/PrimaryButton.jsx'
import { validateEmail, validateRequired } from '../../utils/validation.js'
import { registerUser } from '../../services/authService.js'

export default function RegisterPage({
  onSwitchToLogin,
  onRegisterSuccess,
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = {}

    if (!validateRequired(name)) {
      nextErrors.name = 'Name is required.'
    }

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

    if (!validateRequired(confirmPassword)) {
      nextErrors.confirmPassword = 'Please confirm your password.'
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    try {
      await registerUser({
        name,
        email,
        password,
      })

      onRegisterSuccess({
        name,
        email,
      })
    } catch (error) {
      setErrors({
        form: error.message || 'Registration failed',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-900">
          Create your AI chat account
        </h2>
        <p className="text-sm text-slate-500">
          Join subject-based chat rooms, share notes, and get AI-powered help.
        </p>
      </div>

      <TextInput
        label="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Alex Student"
        error={errors.name}
      />

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
        placeholder="At least 6 characters"
        error={errors.password}
      />

      <TextInput
        label="Confirm password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Re-type your password"
        error={errors.confirmPassword}
      />

      {errors.form && (
        <p className="text-sm text-red-600 text-center">
          {errors.form}
        </p>
      )}

      <PrimaryButton
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating account…' : 'Create account'}
      </PrimaryButton>

      <p className="text-xs text-slate-500 text-center">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  )
}
