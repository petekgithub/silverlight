import React, { useState } from "react";
import axios from "axios";
import validator from "validator";

const AnalysisPage = () => {
  const [url, setUrl] = useState("");
  const [analyzingTargets, setAnalyzingTargets] = useState([]);
  const [showAnalyzingTargets, setShowAnalyzingTargets] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const inputUrl = e.target.value;
    console.log("Input URL:", inputUrl); // Debug logging
    setUrl(inputUrl);
    if (inputUrl.trim() !== "") {
      validate(inputUrl); // Call validate with the input URL if it's not empty
    }
  };

  const validate = (value) => {
    if (!value) {
      setErrorMessage("Please enter a URL");
      return;
    }

    let urlToValidate = value;
    if (!value.startsWith("http://") && !value.startsWith("https://")) {
      // Prepend "http://" if the URL doesn't start with a protocol
      urlToValidate = "http://" + value;
    }

    const isValidURL = validator.isURL(urlToValidate);

    if (!isValidURL) {
      setErrorMessage("Invalid URL");
      return;
    }

    const domain = value.replace(/(^\w+:|^)\/\//, ""); // Extract the domain part
    const isValidDomain = validator.isFQDN(domain, {
      require_tld: false, // Don't require top-level domain (TLD)
      allow_underscores: true, // Allow underscores in domain names
    });

    if (!isValidDomain) {
      setErrorMessage("Invalid Domain");
      return;
    }

    setErrorMessage(""); // Clear error message if URL is valid
  };

  const handleAnalyse = async (e) => {
    e.preventDefault();

    // Validate URL
    if (!validator.isURL(url)) {
      setErrorMessage("Invalid URL");
      return; // Exit function if URL is invalid
    }

    // Analyze URL
    try {
      const response = await axios.post("http://localhost:3000/analyze", {
        url: url,
      });
      console.log("Analysis result:", response.data);
      // Add the input URL to the analyzingTargets array
      setAnalyzingTargets([...analyzingTargets, url]);
      setShowAnalyzingTargets(true); // Show the "Analyzing Targets" heading
      setUrl(""); // Clear the input field after adding the URL to the list
    } catch (error) {
      console.error("Error analyzing website:", error);
    }
  };

  const handleTargetClick = (clickedUrl) => {
    // Handle button click, e.g., navigate to details page
    console.log("Clicked on:", clickedUrl);
  };

  return (
    <div className="container">
      <h2>SilverLight</h2>
      <form onSubmit={handleAnalyse}>
        <input
          className="input"
          type="text"
          placeholder="Enter URL to analyze"
          value={url}
          onChange={handleChange}
        />
        <span style={{ fontWeight: "bold", color: "red" }}>{errorMessage}</span>
        <button
          className="btn-analyse"
          type="submit"
          disabled={!url || errorMessage === "Invalid URL"} // Disable button if URL is empty or invalid
        >
          Analyse
        </button>
      </form>
      {showAnalyzingTargets && (
        <div className="analyzing-targets">
          <h3>Analyzing Targets</h3>
          <div className="buttons-container">
            {analyzingTargets.map((target, index) => (
              <div key={index}>
                <button
                  className="analyzing-target-button"
                  style={{
                    backgroundColor: "#c5c5c5",
                    color: "#007bff", // Blue color for link
                    border: "none",
                    textAlign: "left", // Align text to the left
                    cursor: "pointer",
                    textDecoration: "underline",
                    padding: "0", // Remove padding to make it look like a link
                    marginBottom: "5px",
                    display: "block", // Make each button occupy the full width
                    width: "100%", // Make each button occupy the full width
                    height: "2rem",
                  }}
                  onClick={() => handleTargetClick(target)}
                >
                  {target}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisPage;
