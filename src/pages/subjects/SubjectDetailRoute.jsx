import { useNavigate, useParams } from 'react-router-dom'
import SubjectDetailPage from './SubjectDetailPage.jsx'
import { getSubjectById } from '../../utils/subjects.js'

// Route-aware wrapper for the existing SubjectDetailPage.
// It reads the subjectId from the URL and passes the matching subject
// object down as a prop, keeping SubjectDetailPage itself very simple.
export default function SubjectDetailRoute() {
  const navigate = useNavigate()
  const { subjectId } = useParams()

  const subject = getSubjectById(subjectId)

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md text-center space-y-3">
          <h1 className="text-xl font-semibold text-slate-900">
            Chat room not found
          </h1>
          <p className="text-sm text-slate-500">
            We couldn&apos;t find this subject chat room. It may have been
            renamed or removed.
          </p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-2 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Back to rooms
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <SubjectDetailPage
          subject={subject}
          onBack={() => navigate(-1)}
        />
      </div>
    </div>
  )
}

