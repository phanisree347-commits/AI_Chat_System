import { useEffect, useMemo, useState } from 'react'
import {
  fetchAchievements,
  fetchProfile,
  fetchProgress,
  fetchStats,
} from '../../services/profileService.js'

export default function ProfilePage({ onRequireLogin }) {
  const [profile, setProfile] = useState(null)
  const [stats, setStats] = useState(null)
  const [progress, setProgress] = useState([])
  const [achievements, setAchievements] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      onRequireLogin?.()
      return
    }

    let isCancelled = false

    async function load() {
      try {
        setIsLoading(true)
        setError('')

        const [p, s, pr, a] = await Promise.all([
          fetchProfile(),
          fetchStats(),
          fetchProgress(),
          fetchAchievements(),
        ])

        if (isCancelled) return

        setProfile(p)
        setStats(s)
        setProgress(pr.subjectProgress || [])
        setAchievements(a.achievements || [])
      } catch (err) {
        if (isCancelled) return
        setError(err.message || 'Failed to load profile')
      } finally {
        if (!isCancelled) setIsLoading(false)
      }
    }

    load()

    return () => {
      isCancelled = true
    }
  }, [onRequireLogin])

  const subjectsCount = progress.length

  const statCards = useMemo(() => {
    return [
      { label: 'Subjects', value: subjectsCount },
      { label: 'Total Messages', value: stats?.totalMessages ?? '—' },
      { label: 'AI Interactions', value: stats?.aiInteractions ?? '—' },
      { label: 'Hours Learned', value: stats?.totalHoursLearned ?? '—' },
      { label: 'Current Streak', value: stats?.currentStreak ?? '—' },
      { label: 'Overall Progress', value: `${stats?.overallProgress ?? 0}%` },
    ]
  }, [subjectsCount, stats])

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-sm text-slate-500">Loading profile…</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="max-w-md text-center space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">Profile error</h3>
          <p className="text-sm text-slate-500">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h3 className="text-lg font-semibold text-slate-900">Your Profile</h3>
        <p className="text-sm text-slate-500">
          Your activity, progress, and achievements across subject chat rooms.
        </p>
      </header>

      <section className="rounded-2xl border border-slate-100 bg-white shadow-sm shadow-slate-200/60 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold">
              {profile?.avatar || profile?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {profile?.name}
              </p>
              <p className="text-sm text-slate-500">{profile?.email}</p>
              <p className="text-xs text-slate-400 mt-1">
                Joined{' '}
                {profile?.joinedAt
                  ? new Date(profile.joinedAt).toLocaleDateString()
                  : '—'}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Edit (UI only)
          </button>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <StatsCard key={card.label} label={card.label} value={card.value} />
        ))}
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white shadow-sm shadow-slate-200/60 p-4 sm:p-6 space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-900">
            Subject Progress
          </h4>
          <p className="text-xs text-slate-500">
            Progress per subject room (UI reflects backend data).
          </p>
        </div>

        {progress.length === 0 ? (
          <p className="text-sm text-slate-500">No progress yet.</p>
        ) : (
          <div className="space-y-3">
            {progress.map((item) => (
              <ProgressBar
                key={item.subject}
                label={item.subject}
                value={Number(item.progress || 0)}
              />
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white shadow-sm shadow-slate-200/60 p-4 sm:p-6 space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Achievements</h4>
          <p className="text-xs text-slate-500">
            Earn badges as you participate more.
          </p>
        </div>

        {achievements.length === 0 ? (
          <p className="text-sm text-slate-500">No achievements yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {achievements.map((a) => (
              <AchievementBadge key={a} text={a} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function StatsCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm shadow-slate-200/60 p-4 hover:shadow-md transition">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-semibold text-slate-900">{value}</p>
    </div>
  )
}

function ProgressBar({ label, value }) {
  const safeValue = Math.max(0, Math.min(100, value))

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">{safeValue}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 transition-[width] duration-700"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  )
}

function AchievementBadge({ text }) {
  return (
    <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 text-xs font-medium">
      {text}
    </span>
  )
}

