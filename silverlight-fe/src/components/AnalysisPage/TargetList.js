const TargetList = ({ targets, loadingStates }) => {
  return (
    <div className="analyzing-targets">
      <h3>Analyzing Targets</h3>
      <div className="buttons-container">
        {targets.map((target, index) => (
          <TargetButton
            key={index}
            target={target}
            loading={loadingStates[target]}
          />
        ))}
      </div>
    </div>
  );
};

const TargetButton = ({ target, loading }) => {
  return (
    <div>
      <button className="analyzing-target-button">
        <span>{target}</span>
        {loading && <span>Analysing...</span>}
        {!loading && (
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
  );
};

export default TargetList;
