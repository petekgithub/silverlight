import React, { useState } from "react";
import validator from "validator";

const UrlInput = ({ onSubmit }) => {
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url) {
      setErrorMessage("Please enter a URL");
      return;
    }

    let urlToValidate = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      urlToValidate = "http://" + url;
    }

    if (!validator.isURL(urlToValidate)) {
      setErrorMessage("Invalid URL");
      return;
    }

    onSubmit(urlToValidate);
    setUrl("");
    setErrorMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        placeholder="Enter URL to analyze"
        value={url}
        onChange={handleChange}
      />
      <span style={{ fontWeight: "bold", color: "red" }}>{errorMessage}</span>
      <button className="btn-analyse" type="submit">
        Analyze
      </button>
    </form>
  );
};

export default UrlInput;
