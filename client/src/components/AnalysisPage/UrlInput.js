import React, { useState } from "react";
import validator from "validator";

const UrlInput = ({ onSubmit }) => {
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);
  };

  const handleSubmit = async (e) => {
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

    // Loading durumunu true yap
    setLoading(true);

    try {
      await onSubmit(urlToValidate); // Valid URL'i ana bileşen için analiz etmek üzere ile
      setUrl("");
      setErrorMessage("");
    } catch (error) {
      console.error("Error submitting URL for analysis: ", error);
      setErrorMessage("An error occurred, please try again");
    } finally {
      // İşlem tamamlandığında Loading durumunu false yap
      setLoading(false);
    }
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
      {/* Loading durumunu kontrol et ve uygun şekilde işlem yap */}
      <button className="btn-analyse" type="submit" disabled={loading}>
        {loading ? "Loading..." : "Analyze"}
      </button>
    </form>
  );
};

export default UrlInput;
