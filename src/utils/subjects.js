// Central list of subjects used by the dashboard and routes.
// Keeping this in a single place makes it easy to reuse and extend.

export const SUBJECTS = [
  {
    id: 'maths',
    name: 'Mathematics',
    level: 'Beginner · Intermediate',
    description:
      'Build strong foundations in algebra, calculus, and problem solving.',
    color: 'from-sky-400 to-indigo-500',
  },
  {
    id: 'programming',
    name: 'Programming',
    level: 'Beginner · Intermediate',
    description:
      'Learn JavaScript, Python, and core computer science concepts.',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    id: 'science',
    name: 'Science',
    level: 'High school · College',
    description:
      'Explore physics, chemistry, and biology with visual explanations.',
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 'languages',
    name: 'Languages',
    level: 'All levels',
    description:
      'Practice vocabulary, grammar, and conversation with AI.',
    color: 'from-fuchsia-400 to-pink-500',
  },
]

export function getSubjectById(subjectId) {
  return SUBJECTS.find((subject) => subject.id === subjectId)
}

