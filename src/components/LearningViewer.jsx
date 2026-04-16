import { useEffect, useState } from "react";
import { renderCourseTemplateHtml } from "../utils/courseHtmlTemplate";

function LearningViewer({ topic, onEditTopic }) {
  const [htmlContent, setHtmlContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  useEffect(() => {
    // HTML injected through dangerouslySetInnerHTML does not execute <script> tags.
    // Register these handlers globally once so inline onclick hooks keep working.
    window.switchTab = (idx) => {
      document
        .querySelectorAll(".tab-btn")
        .forEach((button, index) => button.classList.toggle("active", index === idx));
      document
        .querySelectorAll(".tab-panel")
        .forEach((panel, index) => panel.classList.toggle("active", index === idx));
    };

    window.switchDay = (idx) => {
      document
        .querySelectorAll(".tab-btn")
        .forEach((button, index) => button.classList.toggle("active", index === idx));
      document
        .querySelectorAll(".day-panel")
        .forEach((panel, index) => panel.classList.toggle("active", index === idx));
    };

    window.toggle = (headerEl) => {
      headerEl?.parentElement?.classList?.toggle("open");
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadContent = async () => {
      if (!topic) return;

      if (topic.sourceType === "custom") {
        setHtmlContent("");
        setError("");
        setLoading(false);
        return;
      }

      if (topic.sourceType === "generated-course") {
        setHtmlContent(renderCourseTemplateHtml(topic.templateData || {}));
        setError("");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      setHtmlContent("");

      try {
        const response = await fetch(topic.sourcePath);
        if (!response.ok) {
          throw new Error("Unable to load topic content.");
        }
        const content = await response.text();
        if (mounted) {
          setHtmlContent(content);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || "Unexpected error while loading content.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadContent();
    return () => {
      mounted = false;
    };
  }, [topic]);

  useEffect(() => {
    setActiveCategoryIndex(0);
  }, [topic?.id]);

  if (!topic) {
    return (
      <section className="panel viewer-panel">
        <h2 className="panel-title">Course Content</h2>
        <p>Select a learning topic to get started.</p>
      </section>
    );
  }

  return (
    <section className="panel viewer-panel">
      <div className="inline-actions">
        <h2 className="panel-title">{topic.title}</h2>
        {topic.sourceType === "custom" || topic.sourceType === "generated-course" ? (
          <button type="button" className="back-button" onClick={() => onEditTopic?.(topic)}>
            Edit
          </button>
        ) : null}
      </div>

      {topic.sourceType === "custom" ? (
        <article className="custom-content">
          <section className="custom-section">
            <h3>Heading Sections</h3>
            {topic.headings?.map((heading, index) => (
              <div key={`heading-${index}`} className="viewer-card">
                <h4>{heading.mainTitle}</h4>
                <p className="viewer-subtitle">{heading.subTitle}</p>
                <p>{heading.description}</p>
                <div className="tag-list">
                  {heading.tags?.map((tag, tagIndex) => (
                    <span key={`${tag}-${tagIndex}`} className="tag-chip static">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="custom-section">
            <h3>Categories</h3>
            <div className="category-tabs">
              {(topic.categories ?? []).map((category, index) => (
                <button
                  key={`${category.name}-${index}`}
                  type="button"
                  className={`category-tab ${activeCategoryIndex === index ? "active" : ""}`}
                  onClick={() => setActiveCategoryIndex(index)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {(topic.categories ?? [])[activeCategoryIndex]?.paragraphs?.map(
              (paragraph, paragraphIndex) => (
                <div key={`paragraph-${paragraphIndex}`} className="viewer-card">
                  <h4>{paragraph.title}</h4>
                  <p>{paragraph.description}</p>
                </div>
              )
            )}
          </section>
        </article>
      ) : null}

      {loading ? <p>Loading content...</p> : null}
      {error ? <p className="error-text">{error}</p> : null}

      {!loading && !error && (topic.sourceType === "html" || topic.sourceType === "generated-course") ? (
        <article
          className="html-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      ) : null}
    </section>
  );
}

export default LearningViewer;
