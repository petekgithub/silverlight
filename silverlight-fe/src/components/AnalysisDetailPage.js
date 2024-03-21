import React from "react";

const AnalyzingTarget = ({ target }) => {
  return (
    <div>
      <p>{target.url}</p>
      <p>Status: {target.status}</p>
      <p>Technologies: {target.technologies.join(", ")}</p>
      <p>Page Count: {target.pageCount}</p>
    </div>
  );
};

export default AnalyzingTarget;
