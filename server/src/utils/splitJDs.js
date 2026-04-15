export function splitJDs(text) {
  return text
    .split(/Sample\s+\d+:/gi)
    .filter(jd => jd && jd.trim().length > 200)
    .map(jd => jd.trim());
}