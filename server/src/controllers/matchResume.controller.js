import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

import { splitJDs } from "../utils/splitJDs.js";
import { extractSkills } from "../utils/skillExtractor.js";
import { extractExperience } from "../utils/experienceExtractor.js";
import { calculateScore } from "../utils/scoreCalculator.js";

export const matchResume = async (req, res) => {
  try {
    const jdText = fs.readFileSync("public/JDs/jd.txt", "utf-8");

    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;

    const jdList = splitJDs(jdText);

    const resumeSkills = extractSkills(resumeText);
    const experience = extractExperience(resumeText);

    const results = [];

    jdList.forEach((jd, index) => {
      const jdSkills = extractSkills(jd);

      const skillsAnalysis = jdSkills.map(skill => ({
        skill,
        presentInResume: resumeSkills.includes(skill)
      }));

      const score = calculateScore(jdSkills, resumeSkills);

      results.push({
        jobId: `JD${index + 1}`,
        skillsAnalysis,
        matchingScore: score
      });
    });

    results.sort((a, b) => b.matchingScore - a.matchingScore);

    res.json({
      name: "John Doe",
      yearOfExperience: experience,
      resumeSkills,
      matchingJobs: results.slice(0, 3)
    });

  } catch (error) {
  console.log("ERROR:", error);
  res.status(500).json({ message: error.message });
}
};