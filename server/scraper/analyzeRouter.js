const express = require("express");
const axios = require("axios").default;
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const cors = require("cors");

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

    // Launch a headless browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the website URL
    await page.goto(url);

    // Get page count
    const pageCount = await page.evaluate(() => {
      const pageNumbers = document.querySelectorAll(".pagination li");
      return pageNumbers.length;
    });

    // Close the browser
    await browser.close();

    // Send the extracted data to the client
    res.status(200).json({
      success: true,
      technologies: uniqueTechnologies,
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

// Function to extract technology names from URLs
const extractTechName = (url) => {
  const parts = url.split("/");
  const filename = parts[parts.length - 1];
  const segments = filename.split("-");
  return segments[0]; // Return the first segment as technology name
};

module.exports = router;
