import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

const AnalysisDetailPage = () => {
  const [technologies, setTechnologies] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const url = urlParams.get("url");
    if (url) {
      fetchData(url);
    }
  }, [location.search]);

  const fetchData = async (url) => {
    try {
      const response = await axios.post("http://localhost:3000/analyze", {
        url: url,
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
      <Link to="/" className="back-link">
        &lt; Back
      </Link>
      <h2>Website Analysis Results</h2>
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
