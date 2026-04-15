const skillsList = [
  "python", "java", "c++", "linux",
  "react", "node.js", "docker",
  "mysql", "git", "kafka",
  "spring boot", "mongodb"
];

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function extractSkills(text = "") {
  const lower = text.toLowerCase();

  return skillsList.filter(skill => {
    const regex = new RegExp(`\\b${escapeRegex(skill)}\\b`, "i");
    return regex.test(lower);
  });
}