const express = require("express");
const axios = require("axios").default;
const router = express.Router();

// Regex for URL validation
const urlRegex =
  /^(https?:\/\/)?([\w-]+\.)*([\w-]+\.)([\w]{2,})([\w\/+=%&_\.~?\-]*)$/;

// Endpoint for URL validation and analysis
router.post("/", async (req, res) => {
  const { url } = req.body;

  // Validate URL
  if (!urlRegex.test(url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const apiKey = process.env.API_KEY;

  try {
    // Analyze website using Scraper API
    const response = await axios.post(
      `http://api.scraperapi.com/?api_key=${apiKey}`,
      { url: url }
    );

    // Extract technology information and page count from the response
    const technologies = response.data.applications.map((app) => app.name);
    const pageCount = response.data.pageCount;

    return res.status(200).json({ success: true, technologies, pageCount });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while analyzing the website" });
  }
});

module.exports = router;
