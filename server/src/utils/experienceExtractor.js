export function extractExperience(text) {
  const match = text.match(/(\d+)\+?\s*(years|yrs)/i);
  if (match) return parseInt(match[1]);

  const yearMatch = text.match(/(20\d{2})\s*[-–]\s*(20\d{2}|present)/i);

  if (yearMatch) {
    const start = parseInt(yearMatch[1]);
    const end = yearMatch[2].toLowerCase() === "present"
      ? new Date().getFullYear()
      : parseInt(yearMatch[2]);

    return end - start;
  }

  return 0;
}