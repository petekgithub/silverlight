const express = require("express");
const axios = require("axios").default;
const cheerio = require("cheerio");
const router = express.Router();

// Static array of technology labels
const techLabels = {
  shell: "Shell",
  "feed-post-client-js": "Feed Post Client",
  "feed-ad-client-js": "Feed Ad Client",
  "chat-channel-feed-element-client-js": "Chat Channel Feed Element Client",
  "dsa-transparency-modal-provider-client-js":
    "DSA Transparency Modal Provider Client",
  "media-lightbox-client-js": "Media Lightbox Client",
  "left-nav-resources-section-client-js": "Left Nav Resources Section Client",
};

// Function to extract technology names from URLs
const extractTechName = (url) => {
  const parts = url.split("/");
  const filename = parts[parts.length - 1];
  const segments = filename.split("-");
  const techLabel = segments[0];
  return techLabels[techLabel] || techLabel;
};

// Endpoint to analyze website
router.post("/", async (req, res) => {
  const { url } = req.body;

  try {
    // Make a request to the website URL
    const response = await axios.get(url);

    // Check if response is successful
    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch HTML content. Status code: ${response.status}`
      );
    }

    const html = response.data;

    // Load the HTML into Cheerio
    const $ = cheerio.load(html);

    // Extract technology information
    const technologies = [];
    $("script[src], link[href]").each((index, element) => {
      const src = $(element).attr("src");
      const href = $(element).attr("href");
      if (src) technologies.push(extractTechName(src));
      if (href) technologies.push(extractTechName(href));
    });

    // Filter out duplicate technology names
    const uniqueTechnologies = Array.from(new Set(technologies));

    // Send the extracted data to the client
    res.status(200).json({
      success: true,
      technologies: uniqueTechnologies,
      pageCount: 0, // Currently not extracting page count
    });
  } catch (error) {
    console.error("Error analyzing website: ", error);

    // Send meaningful error response to the client
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
