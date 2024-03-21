import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnalysisPage from "./components/AnalysisPage";
import AnalysisDetailPage from "./components/AnalysisDetailPage";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnalysisPage />} />
        <Route path="/detail" element={<AnalysisDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
