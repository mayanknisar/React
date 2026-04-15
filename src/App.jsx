import { useEffect, useMemo, useState } from "react";
import AddTopicForm from "./components/AddTopicForm";
import HtmlCourseGenerator from "./components/HtmlCourseGenerator";
import LearningList from "./components/LearningList";
import LearningViewer from "./components/LearningViewer";
import MenuPage from "./components/MenuPage";
import defaultLearningTopics from "./data/learningTopics";

const STORAGE_KEY = "learning-dashboard-custom-topics";

function App() {
  const [currentPage, setCurrentPage] = useState("menu");
  const [customTopics, setCustomTopics] = useState([]);
  const topics = useMemo(
    () => [...defaultLearningTopics, ...customTopics],
    [customTopics]
  );
  const [activeTopicId, setActiveTopicId] = useState(defaultLearningTopics[0].id);

  const activeTopic = useMemo(
    () => topics.find((topic) => topic.id === activeTopicId),
    [topics, activeTopicId]
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setCustomTopics(parsed);
      }
    } catch (error) {
      console.error("Failed to read custom topics from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customTopics));
    } catch (error) {
      console.error("Failed to persist custom topics to localStorage:", error);
    }
  }, [customTopics]);

  const handleAddTopic = (formData) => {
    const topicId = `${formData.title}-${Date.now()}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");

    const categories = formData.categories ?? [];
    const headings = formData.headings ?? [];

    const newTopic = {
      id: topicId,
      title: formData.title.trim(),
      category: categories[0]?.name?.trim() || "Custom",
      level: "User Topic",
      description:
        headings[0]?.description?.trim() ||
        `${headings.length} heading(s), ${categories.length} category(ies)`,
      headings,
      categories,
      sourceType: "custom"
    };

    setCustomTopics((prev) => [...prev, newTopic]);
    setActiveTopicId(topicId);
    setCurrentPage("topic-view");
  };

  const handleMenuSelect = (page) => {
    if (page === "tools") {
      setCurrentPage("tools-list");
      return;
    }
    setCurrentPage(page);
  };

  const handleTopicSelect = (topicId) => {
    setActiveTopicId(topicId);
    setCurrentPage("topic-view");
  };

  const handleBack = () => {
    if (currentPage === "topic-view") {
      setCurrentPage("tools-list");
      return;
    }
    setCurrentPage("menu");
  };

  return (
    <main className="app-shell">
      <header className="app-header">
        <h1>Learning Dashboard</h1>
        <p>Browse modules, open tools, or add new learning topics.</p>
      </header>

      {currentPage !== "menu" ? (
        <button type="button" className="back-button" onClick={handleBack}>
          {currentPage === "topic-view" ? "Back to Learning Topics" : "Back to Menu"}
        </button>
      ) : null}

      {currentPage === "menu" ? <MenuPage onSelectPage={handleMenuSelect} /> : null}

      {currentPage === "tools-list" ? (
        <LearningList
          topics={topics}
          activeTopicId={activeTopicId}
          onSelect={handleTopicSelect}
        />
      ) : null}

      {currentPage === "topic-view" ? <LearningViewer topic={activeTopic} /> : null}

      {currentPage === "add-topic" ? <AddTopicForm onAddTopic={handleAddTopic} /> : null}

      {currentPage === "html-generator" ? <HtmlCourseGenerator /> : null}
    </main>
  );
}

export default App;
