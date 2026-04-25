function LearningList({ topics, activeTopicId, onSelect, onEditTopic }) {
  const getCategoryColor = (sourceType) => {
    if (sourceType === "custom") return "#22863a";
    if (sourceType === "generated-course") return "#0969da";
    return "#6984c7";
  };

  const getCategoryLabel = (sourceType) => {
    if (sourceType === "custom") return "Custom";
    if (sourceType === "generated-course") return "Generated";
    return "Built-in";
  };

  return (
    <section className="panel" aria-label="Learning Topics List">
      <h2 className="panel-title">Learning Topics</h2>
      <div className="topic-list" role="listbox" aria-label="Available learning topics">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className={`topic-card ${activeTopicId === topic.id ? "active" : ""}`}
            onClick={() => onSelect(topic.id)}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onSelect(topic.id);
              }
            }}
            role="option"
            aria-selected={activeTopicId === topic.id}
            tabIndex={0}
            aria-label={`${topic.title}, ${getCategoryLabel(topic.sourceType)}, ${topic.category}`}
          >
            <div className="topic-header">
              <span className="topic-title">{topic.title}</span>
              <span
                className="topic-badge"
                style={{ backgroundColor: getCategoryColor(topic.sourceType) }}
                aria-label={`Type: ${getCategoryLabel(topic.sourceType)}`}
              >
                {getCategoryLabel(topic.sourceType)}
              </span>
            </div>
            <div className="topic-meta-row">
              <span className="topic-meta">{topic.category}</span>
              <span className="topic-level">{topic.level}</span>
            </div>
            <span className="topic-description">{topic.description}</span>
            {topic.sourceType === "custom" || topic.sourceType === "generated-course" ? (
              <button
                type="button"
                className="topic-edit-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditTopic?.(topic);
                }}
                aria-label={`Edit ${topic.title}`}
              >
                ✏️ Edit
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

export default LearningList;
