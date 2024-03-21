require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// CORS middleware
app.use(cors());

// Body parser middleware
app.use(express.json());

// Router for analyze endpoint
const analyzeRouter = require("./router/analyzeRouter");
app.use("/analyze", analyzeRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
