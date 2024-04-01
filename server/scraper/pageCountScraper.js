// pageCountScraper.js
const puppeteer = require("puppeteer");

// Function to scrape page count
async function scrapePageCount(url) {
  // Launch a headless browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the website URL
  await page.goto(url);

  // Get page count
  const pageCount = await page.evaluate(() => {
    // Select the pagination element
    const pageNumbers = document.querySelectorAll(".pagination li");
    // Return the length of pagination elements
    return pageNumbers.length;
  });

  // Close the browser
  await browser.close();

  return pageCount;
}

module.exports = scrapePageCount;
