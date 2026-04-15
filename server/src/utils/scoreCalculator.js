export function calculateScore(jdSkills, resumeSkills) {
  if (!jdSkills || jdSkills.length === 0) return 0;

  const matched = jdSkills.filter(skill =>
    resumeSkills.includes(skill)
  ).length;

  return Math.round((matched / jdSkills.length) * 100);
}