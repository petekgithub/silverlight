import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

const AnalysisDetailPage = () => {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
      setLoading(true);
      const response = await axios.post("http://localhost:3000/analyze", {
        url: url,
      });
      const { technologies } = response.data;
      setTechnologies(technologies);
      setError(null);
    } catch (error) {
      console.log("Error fetching data: ", error);
      setError("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Link to="/" className="back-link">
        &lt; Back
      </Link>
      <h2>Website Analysis Results</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Technologies:</p>
          <ul className="techs">
            {technologies.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default AnalysisDetailPage;
