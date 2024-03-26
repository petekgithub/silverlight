import React, { useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import TargetList from "./TargetList";
import UrlInput from "./UrlInput";

const AnalysisPage = () => {
  const [analyzingTargets, setAnalyzingTargets] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const urlsPerPage = 3;

  const handleAnalyse = async (url) => {
    if (!url) return;

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
      <UrlInput onSubmit={handleAnalyse} />
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
