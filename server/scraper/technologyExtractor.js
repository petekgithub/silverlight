// technologyExtractor.js
const cheerio = require("cheerio");

// Function to extract technology names from URLs
const extractTechName = (url) => {
  const parts = url.split("/");
  const filename = parts[parts.length - 1];
  const segments = filename.split("-");
  return segments[0]; // Return the first segment as technology name
};

// Extract technology information
const extractTechnologies = (html) => {
  const $ = cheerio.load(html); // HTML içeriğini cheerio ile yükle

  const technologies = [];

  $("script[src], link[href]").each((index, element) => {
    const src = $(element).attr("src");
    const href = $(element).attr("href");
    if (src) technologies.push(extractTechName(src));
    if (href) technologies.push(extractTechName(href));
  });

  // Filter out duplicate technology names
  const uniqueTechnologies = Array.from(new Set(technologies));

  return uniqueTechnologies;
};

module.exports = extractTechnologies;
