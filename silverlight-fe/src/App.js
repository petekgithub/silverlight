import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [url, setUrl] = useState("");
  const [analyzingTargets, setAnalyzingTargets] = useState([]);

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleAnalyse = async () => {
    try {
      const response = await axios.post("http://localhost:3000/analyze", {
        url: url,
      });
      const { technologies, pageCount } = response.data;
      const newTarget = {
        url: url,
        technologies: technologies,
        pageCount: pageCount,
        status: "Analyzing",
      };
      setAnalyzingTargets([...analyzingTargets, newTarget]);
    } catch (error) {
      console.error("Error analyzing website:", error);
    }
  };

  return (
    <div>
      <input type="text" value={url} onChange={handleChange} />
      <button onClick={handleAnalyse}>Analyse</button>
      <div>
        <h2>Analyzing Targets</h2>
        {analyzingTargets.map((target, index) => (
          <div key={index}>
            <p>{target.url}</p>
            <p>Status: {target.status}</p>
            <p>Technologies: {target.technologies.join(", ")}</p>
            <p>Page Count: {target.pageCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
