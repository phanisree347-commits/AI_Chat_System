import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import SubjectDetailRoute from './pages/subjects/SubjectDetailRoute.jsx'

// App is the root component of our frontend-only app.
// It keeps track of whether the user is "logged in" and which
// high-level view to show (auth vs dashboard).
export default function App() {
  const [currentUser, setCurrentUser] = useState(null)

  // Track whether the auth screen is Login or Register.
  const [authView, setAuthView] = useState('login') // 'login' | 'register'

  // Called when the user successfully "logs in" or "registers".
  const handleAuthSuccess = (userData) => {
    setCurrentUser(userData)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setAuthView('login')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    const rawUser = localStorage.getItem('user')

    if (token && rawUser) {
      try {
        setCurrentUser(JSON.parse(rawUser))
      } catch {
        localStorage.removeItem('user')
      }
    }
  }, [])

  // If there is no current user, show the authentication screens.
  if (!currentUser) {
    return (
      <AuthLayout
        authView={authView}
        onChangeView={setAuthView}
        onAuthSuccess={handleAuthSuccess}
      />
    )
  }

  // Once "logged in", use React Router to decide which page to show.
  return (
    <Routes>
      <Route
        path="/"
        element={<DashboardLayout user={currentUser} onLogout={handleLogout} />}
      />
      <Route path="/subjects/:subjectId" element={<SubjectDetailRoute />} />
    </Routes>
  )
}