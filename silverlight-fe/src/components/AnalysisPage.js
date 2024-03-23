import React, { useState } from "react";
import axios from "axios";
import validator from "validator";
import Pagination from "./Pagination";

const AnalysisPage = () => {
  const [url, setUrl] = useState("");
  const [analyzingTargets, setAnalyzingTargets] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const urlsPerPage = 3;

  const handleChange = (e) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);
    if (inputUrl.trim() !== "") {
      validate(inputUrl);
    }
  };

  const validate = (value) => {
    if (!value) {
      setErrorMessage("Please enter a URL");
      return;
    }

    let urlToValidate = value;
    if (!value.startsWith("http://") && !value.startsWith("https://")) {
      urlToValidate = "http://" + value;
    }

    const isValidURL = validator.isURL(urlToValidate);

    if (!isValidURL) {
      setErrorMessage("Invalid URL");
      return;
    }

    const domain = value.replace(/(^\w+:|^)\/\//, "");
    const isValidDomain = validator.isFQDN(domain, {
      require_tld: false,
      allow_underscores: true,
    });

    if (!isValidDomain) {
      setErrorMessage("Invalid Domain");
      return;
    }

    setErrorMessage("");
  };

  const handleAnalyse = async (e) => {
    e.preventDefault();

    if (!validator.isURL(url)) {
      setErrorMessage("Invalid URL");
      return;
    }

    const urlToAnalyze = url.trim();
    if (loadingStates[urlToAnalyze]) {
      return;
    }

    setLoadingStates({ ...loadingStates, [urlToAnalyze]: true });

    try {
      const response = await axios.post("http://localhost:3000/analyze", {
        url: urlToAnalyze,
      });
      console.log("Analysis result:", response.data);
      setAnalyzingTargets([...analyzingTargets, urlToAnalyze]);
      setTimeout(() => {
        setLoadingStates({
          ...loadingStates,
          [urlToAnalyze]: false,
        });
      }, 5000);
    } catch (error) {
      console.error("Error analyzing website:", error);
      setLoadingStates({
        ...loadingStates,
        [urlToAnalyze]: false,
      });
    }

    setUrl("");
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get current urls
  const indexOfLastUrl = currentPage * urlsPerPage;
  const indexOfFirstUrl = indexOfLastUrl - urlsPerPage;
  const currentUrls = analyzingTargets.slice(indexOfFirstUrl, indexOfLastUrl);

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
          disabled={!url || errorMessage === "Invalid URL"}
        >
          Analyse
        </button>
      </form>
      {currentUrls.length > 0 && (
        <div className="analyzing-targets">
          <h3>Analyzing Targets</h3>
          <div className="buttons-container">
            {currentUrls.map((target, index) => (
              <div key={index}>
                <button className="analyzing-target-button">
                  <span>{target}</span>
                  {loadingStates[target] && <span>Analysing...</span>}
                  {!loadingStates[target] && (
                    <a
                      href="/analysis-detail"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-more-link"
                    >
                      View More
                    </a>
                  )}
                </button>
              </div>
            ))}
          </div>
          <Pagination
            urlsPerPage={urlsPerPage}
            totalUrls={analyzingTargets.length}
            currentPage={currentPage}
            handlePagination={handlePagination}
          />
        </div>
      )}
    </div>
  );
};

export default AnalysisPage;
