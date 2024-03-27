const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const analyzeScraper = require("./scraper/analyzeScraper");

const app = express();
const port = process.env.PORT || 3000;

// CORS middleware
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

// Use the analyze router
app.use("/analyze", analyzeScraper);

module.exports = app; // Export the express app

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
