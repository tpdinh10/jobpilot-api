const stopWords = require("../utils/stopWords");

const aliases = {
  "node.js": "nodejs",
  node: "nodejs",
  mongo: "mongodb",
  js: "javascript",
  reactjs: "react",
  expressjs: "express"
};

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

function getWeight(word) {
  return weights[word] || 1;
}

function mapAlias(word) {
  return aliases[word] || word;
}

function normalizeText(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9.\s]/g, " ")     // replace punctuation with spaces
    .split(/\s+/)
    .map(w => w.replace(/\.+$/g, ""))  // remove trailing dots
    .filter(word => word.length > 2 && !stopWords.has(word))
    .map(mapAlias);
}

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

  const score = totalWeight === 0 ? 0 : Math.round((matchedWeight / totalWeight) * 100);

  return { score, matchedKeywords: matched, missingKeywords: missing };
}

module.exports = { getMatchScore };
