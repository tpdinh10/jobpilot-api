const stopWords = require("../utils/stopWords");

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));
}

function getMatchScore(resumeText, jobText) {
  const resumeWords = new Set(normalizeText(resumeText));
  const jobWords = new Set(normalizeText(jobText));

  const matched = [];
  const missing = [];

  jobWords.forEach(word => {
    if (resumeWords.has(word)) {
      matched.push(word);
    } else {
      missing.push(word);
    }
  });

  const score =
    jobWords.size === 0
      ? 0
      : Math.round((matched.length / jobWords.size) * 100);

  return {
    score,
    matchedKeywords: matched,
    missingKeywords: missing
  };
}

module.exports = { getMatchScore };
