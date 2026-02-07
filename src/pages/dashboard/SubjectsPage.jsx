import { useNavigate } from 'react-router-dom'
import SubjectCard from '../../components/subjects/SubjectCard.jsx'
import { SUBJECTS } from '../../utils/subjects.js'

// Shows a grid of subjects. Each card notifies the parent when clicked
// and also navigates to a subject detail route.
export default function SubjectsPage({ onSelectSubject }) {
  const navigate = useNavigate()

  const handleSubjectClick = (subject) => {
    // Let the parent know which subject was chosen (existing behavior).
    if (onSelectSubject) {
      onSelectSubject(subject)
    }

    // Navigate to a clean, scalable route like /subjects/maths.
    navigate(`/subjects/${subject.id}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Choose a subject chat room
          </h3>
          <p className="text-sm text-slate-500">
            Each room is a focused chat for one subject with shared notes and AI
            assistance.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SUBJECTS.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onClick={() => handleSubjectClick(subject)}
          />
        ))}
      </div>
    </div>
  )
}

