function LearningList({ topics, activeTopicId, onSelect }) {
  return (
    <section className="panel">
      <h2 className="panel-title">Learning Topics</h2>
      <div className="topic-list">
        {topics.map((topic) => (
          <button
            key={topic.id}
            type="button"
            className={`topic-card ${activeTopicId === topic.id ? "active" : ""}`}
            onClick={() => onSelect(topic.id)}
          >
            <span className="topic-title">{topic.title}</span>
            <span className="topic-meta">
              {topic.category} | {topic.level}
            </span>
            <span className="topic-description">{topic.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default LearningList;
