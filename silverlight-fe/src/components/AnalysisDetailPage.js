import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const AnalysisDetailPage = () => {
  const [technologies, setTechnologies] = useState([]);
  const [pageNumber, setPageNumber] = useState(0); // Sayfa sayısını saklamak için state
  const location = useLocation(); // Hook to access the current URL location

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search); // Extract URL parameters
    const url = urlParams.get("url"); // Get the 'url' parameter from the URL
    if (url) {
      fetchData(url);
    }
  }, [location.search]);

  // Function to fetch data from backend
  const fetchData = async (url) => {
    try {
      const response = await axios.post("http://localhost:3000/analyze", {
        url: url, // Kullanıcıdan alınan URL'i gönder
      });
      const { technologies, pageCount } = response.data;
      setTechnologies(technologies);
      setPageNumber(pageCount);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  return (
    <div className="container">
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textAlign: "right",
          cursor: "pointer",
          color: "#007bff",
          textDecoration: "none",
        }}
      >
        &lt; Back
      </a>
      <h2>Website Analysis Results</h2>

      {/* Display information about the technologies and link count */}
      <p className="found">{pageNumber} Pages Found</p>
      <p>Technologies:</p>
      <ul className="techs">
        {technologies.map((tech, index) => (
          <li key={index}>{tech}</li>
        ))}
      </ul>
    </div>
  );
};

export default AnalysisDetailPage;
