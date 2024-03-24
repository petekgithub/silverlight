const express = require("express");
const axios = require("axios").default;
const router = express.Router();

// Endpoint to analyze website
router.post("/", async (req, res) => {
  const { url } = req.body;

  try {
    // Make a request to Scraper API using the provided URL
    const response = await axios.get(
      `https://api.scraperapi.com/?api_key=${
        process.env.API_KEY
      }&url=${encodeURIComponent(url)}`
    );

    // Extract technology information and page count from the response
    const { technologies, pageCount } = extractDataFromResponse(response.data);

    // Send the extracted data to the client
    res.status(200).json({ success: true, technologies, pageCount });
  } catch (error) {
    console.error("Error fetching data: ", error);
    res
      .status(500)
      .json({ error: "An error occurred while analyzing the website" });
  }
});

// Function to extract data from the response received from Scraper API
function extractDataFromResponse(data) {
  // For now, returning dummy data
  return {
    technologies: ["Technology1", "Technology2", "Technology3"],
    pageCount: 10,
  };
}

module.exports = router;
