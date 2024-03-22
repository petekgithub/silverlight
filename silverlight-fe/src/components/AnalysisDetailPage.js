// AnalysisDetailPage.js
import React from "react";

const AnalysisDetailPage = () => {
  // Fetch data about the website's technologies and link count
  // You can use useEffect to fetch data when the component mounts

  return (
    <div className="container">
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textAlign: "right",
          cursor: "pointer",
        }}
      >
        Back
      </a>
      <h2>epctexc.com Results</h2>
      {/* Display information about the technologies and link count */}
      <p>Technologies: [List of technologies]</p>
      <p>Number of Links: [Link count]</p>
    </div>
  );
};

export default AnalysisDetailPage;
