import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

const AnalysisDetailPage = () => {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [pageCount, setPageCount] = useState(0);

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
      const { technologies, pageCount } = response.data;
      setTechnologies(technologies);
      setPageCount(pageCount);
      setError(null);
    } catch (error) {
      console.log("Error fetching data: ", error);
      if (error.response && error.response.status === 403) {
        setError("Access to the requested resource is forbidden.");
      } else {
        setError("An error occurred while fetching data");
      }
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

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p className="pages">{pageCount} Pages Found </p>
          <p>Technologies:</p>
          <div className="techs">
            {technologies.map((tech, index) => (
              <div key={index} className="tech">
                {tech}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AnalysisDetailPage;
