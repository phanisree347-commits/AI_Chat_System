// overallProgress = average of subjectProgress percentages.
// Returns a number between 0 and 100.
export function recalculateOverallProgress(subjectProgress = []) {
  if (!Array.isArray(subjectProgress) || subjectProgress.length === 0) {
    return 0;
  }

  const total = subjectProgress.reduce((sum, item) => {
    const value = Number(item?.progress || 0);
    return sum + Math.max(0, Math.min(100, value));
  }, 0);

  return Math.round((total / subjectProgress.length) * 100) / 100;
}

