import React, { useState } from "react";
import axios from "axios";
import validator from "validator";
import Pagination from "./Pagination";
import UrlInput from "./UrlInput";
import TargetList from "./TargetList";

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
      <UrlInput
        value={url}
        onSubmit={handleAnalyse}
        onChange={handleChange}
        errorMessage={errorMessage}
        disabled={!url || errorMessage === "Invalid URL"}
      />
      {currentUrls.length > 0 && (
        <div className="analyzing-targets">
          <TargetList targets={currentUrls} loadingStates={loadingStates} />
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
