const stopWords = require("../utils/stopWords");
const aliases = {
  "node.js": "nodejs",
  "node": "nodejs",
  "mongodb": "mongodb",
  "mongo": "mongodb",
  "js": "javascript",
  "reactjs": "react",
  "expressjs": "express"
};

function mapAlias(word) {
  return aliases[word] || word;
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9.\s]/g, "") // keep dots so "node.js" stays together first
    .split(/\s+/)
    .map(w => w.replace(/\.+$/g, "")) // remove trailing dots
    .filter(word => word.length > 2 && !stopWords.has(word))
    .map(mapAlias);
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
