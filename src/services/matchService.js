// Stop words are removed to avoid scoring meaningless filler words
// (e.g., "and", "with", "experience") that do not represent technical skills.
const stopWords = require("../utils/stopWords");

// Alias mapping ensures different forms of the same technology
// are normalized into a single canonical keyword.
// Example: "Node.js", "node" → "nodejs"
const aliases = {
  "node.js": "nodejs",
  node: "nodejs",
  mongo: "mongodb",
  js: "javascript",
  reactjs: "react",
  expressjs: "express"
};

// Weighted scoring allows core backend skills to have higher impact.
// This makes the match score more realistic compared to simple word overlap.
const weights = {
  nodejs: 3,
  mongodb: 3,
  jwt: 3,
  express: 2,
  react: 2,
  javascript: 2,
  typescript: 2,
  api: 1,
  rest: 1,
  git: 1
};

// Return configured weight for a keyword (default weight = 1).
function getWeight(word) {
  return weights[word] || 1;
}

// Normalize keyword aliases to ensure consistent comparison.
function mapAlias(word) {
  return aliases[word] || word;
}

// Normalize input text before matching:
// 1. Lowercase for case-insensitive comparison
// 2. Replace punctuation with spaces (prevents glued tokens like "jsreactjs")
// 3. Split into tokens
// 4. Remove stop words and short words
// 5. Apply alias mapping
function normalizeText(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9.\s]/g, " ")
    .split(/\s+/)
    .map(w => w.replace(/\.+$/g, ""))
    .filter(word => word.length > 2 && !stopWords.has(word))
    .map(mapAlias);
}

// Compute weighted match score between resume and job description.
// The score is based only on job-required keywords,
// ensuring the resume is evaluated against employer expectations.
function getMatchScore(resumeText = "", jobText = "") {
  const resumeWords = new Set(normalizeText(resumeText));
  const jobWords = new Set(normalizeText(jobText));

  const matched = [];
  const missing = [];

  let matchedWeight = 0;
  let totalWeight = 0;

  jobWords.forEach(word => {
    const w = getWeight(word);
    totalWeight += w;

    if (resumeWords.has(word)) {
      matched.push(word);
      matchedWeight += w;
    } else {
      missing.push(word);
    }
  });

  // Avoid division by zero if job description contains no valid keywords
  const score =
    totalWeight === 0 ? 0 : Math.round((matchedWeight / totalWeight) * 100);

  return { score, matchedKeywords: matched, missingKeywords: missing };
}

module.exports = { getMatchScore };
