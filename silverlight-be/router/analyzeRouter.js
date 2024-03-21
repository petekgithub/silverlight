const express = require("express");
const axios = require("axios").default;
const router = express.Router();

// Endpoint for URL validation and analysis
router.post("/", async (req, res) => {
  const { url } = req.body;

  // Validate URL
  const urlRegex =
    /^(https?:\/\/)?([\w-]+\.)*([\w-]+\.)([\w]{2,})([\w\/+=%&_\.~?\-]*)$/;
  if (!urlRegex.test(url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  // API key for builtwith.com
  const apiKey = process.env.BUILTWITH_API_KEY;

  try {
    // Make request to builtwith.com API
    const response = await axios.get("https://api.builtwith.com/v19/api.json", {
      params: {
        KEY: apiKey,
        LOOKUP: url,
      },
    });

    // Extract technology information from the response
    const technologies = response.data.Results.map((result) => result.Name);

    return res.status(200).json({ success: true, technologies });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while analyzing the website" });
  }
});

module.exports = router;
