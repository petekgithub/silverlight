require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const analyzeRouter = require("./router/analyzeRouter"); // Import the router module

const app = express();
const port = process.env.PORT || 3000;

// CORS middleware
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

// Use the analyze router
app.use("/analyze", analyzeRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
