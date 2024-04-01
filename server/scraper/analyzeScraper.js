const express = require("express");
const axios = require("axios").default;
const cors = require("cors");
const technologyExtractor = require("./technologyExtractor");
const pageCountScraper = require("./pageCountScraper");

const router = express.Router();

// Use CORS middleware
router.use(cors());

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

    // Extract technology information
    const technologies = technologyExtractor(html);

    // Scrape page count
    const pageCount = await pageCountScraper(url);

    // Send the extracted data to the client
    res.status(200).json({
      success: true,
      technologies: technologies,
      pageCount: pageCount,
    });
  } catch (error) {
    if (error.response) {
      console.log("Server responded with error:", error.response.status);
      res
        .status(error.response.status)
        .json({ error: error.response.statusText });
    } else if (error.request) {
      console.log("No response received from the server.");
      res.status(500).json({ error: "No response received from the server" });
    } else {
      console.log("Error making request:", error.message);
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;
