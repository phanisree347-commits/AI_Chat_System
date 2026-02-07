import LoginPage from '../pages/auth/LoginPage.jsx'
import RegisterPage from '../pages/auth/RegisterPage.jsx'

// Simple, centered layout used for Login and Register pages.
export default function AuthLayout({ authView, onChangeView, onAuthSuccess }) {
  const isLogin = authView === 'login'

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            AI Chat System
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Chat-first subject rooms with AI-assisted notes and context.
          </p>
        </div>

        <div className="bg-white shadow-lg shadow-slate-200/60 rounded-2xl p-6 border border-slate-100">
          {isLogin ? (
            <LoginPage
              onSwitchToRegister={() => onChangeView('register')}
              onLoginSuccess={onAuthSuccess}
            />
          ) : (
            <RegisterPage
              onSwitchToLogin={() => onChangeView('login')}
              onRegisterSuccess={onAuthSuccess}
            />
          )}
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          UI only demo · No real accounts or data are created.
        </p>
      </div>
    </div>
  )
}

