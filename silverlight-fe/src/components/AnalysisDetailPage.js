import React, { useState, useEffect } from "react";
import axios from "axios";

const AnalysisDetailPage = () => {
  const [technologies, setTechnologies] = useState([]);
  const [pageNumber, setPageNumber] = useState(0); // Sayfa sayısını saklamak için state
  const [url, setUrl] = useState(""); // URL'i saklamak için state

  // Function to fetch data from backend when URL changes
  useEffect(() => {
    if (url) {
      // URL state'i boş değilse isteği gönder
      fetchData();
    }
  }, [url]); // URL state'i değiştiğinde useEffect'in çalışmasını sağla

  // Function to fetch data from backend
  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:3000/analyze", {
        url: url, // Kullanıcıdan alınan URL'i gönder
      });
      const { technologies, pageCount } = response.data;
      setTechnologies(technologies); // backend'den gelen yanıttan teknoloji bilgilerini al
      setPageNumber(pageCount); // backend'den gelen yanıttan sayfa sayısını al
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
