import React, { useState } from "react";
import axios from "axios";

const AnalysisPage = () => {
  const [url, setUrl] = useState("");
  const [analyzingTargets, setAnalyzingTargets] = useState([]);
  const [showAnalyzingTargets, setShowAnalyzingTargets] = useState(false);

  const handleChange = (e) => {
    const inputUrl = e.target.value;
    console.log("Input URL:", inputUrl); // Debug logging
    setUrl(inputUrl);
  };

  const handleAnalyse = async (e) => {
    e.preventDefault();
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
        <button
          className="btn-analyse"
          type="submit"
          disabled={!url} // Disable button if URL is empty
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
