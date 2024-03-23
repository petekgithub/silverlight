const UrlInput = ({ value, onChange, errorMessage, onSubmit, disabled }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        className="input"
        type="text"
        placeholder="Enter URL to analyze"
        value={value}
        onChange={onChange}
      />
      <span style={{ fontWeight: "bold", color: "red" }}>{errorMessage}</span>
      <button className="btn-analyse" type="submit" disabled={disabled}>
        Analyse
      </button>
    </form>
  );
};

export default UrlInput;
