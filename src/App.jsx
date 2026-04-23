import { useEffect, useMemo, useState } from "react";
import AddTopicForm from "./components/AddTopicForm";
import HtmlCourseGenerator from "./components/HtmlCourseGenerator";
import LearningList from "./components/LearningList";
import LearningViewer from "./components/LearningViewer";
import MenuPage from "./components/MenuPage";
import SettingsPage from "./components/SettingsPage";
import defaultLearningTopics from "./data/learningTopics";

const STORAGE_KEY = "learning-dashboard-custom-topics";

const loadCustomTopicsFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to read custom topics from localStorage:", error);
    return [];
  }
};

function App() {
  const [currentPage, setCurrentPage] = useState("menu");
  const [customTopics, setCustomTopics] = useState(loadCustomTopicsFromStorage);
  const [editingTopicId, setEditingTopicId] = useState("");
  const topics = useMemo(
    () => [...defaultLearningTopics, ...customTopics],
    [customTopics]
  );
  const [activeTopicId, setActiveTopicId] = useState(defaultLearningTopics[0].id);

  const activeTopic = useMemo(
    () => topics.find((topic) => topic.id === activeTopicId),
    [topics, activeTopicId]
  );
  const editingTopic = useMemo(
    () => customTopics.find((topic) => topic.id === editingTopicId),
    [customTopics, editingTopicId]
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customTopics));
    } catch (error) {
      console.error("Failed to persist custom topics to localStorage:", error);
    }
  }, [customTopics]);

  const handleAddTopic = (formData) => {
    const topicId = editingTopicId
      ? editingTopicId
      : `${formData.title}-${Date.now()}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");

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

    setCustomTopics((prev) => {
      if (!editingTopicId) {
        return [...prev, newTopic];
      }
      return prev.map((topic) => (topic.id === editingTopicId ? newTopic : topic));
    });
    setEditingTopicId("");
    setActiveTopicId(topicId);
    setCurrentPage("topic-view");
  };

  const handleSaveGeneratedCourse = (courseFormData) => {
    const title = courseFormData.title?.trim() || "Generated Course";
    const topicId = editingTopicId
      ? editingTopicId
      : `${title}-${Date.now()}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const tabs = courseFormData.tabs ?? [];
    const firstTab = tabs[0];

    const newTopic = {
      id: topicId,
      title,
      category: "Generated Course",
      level: "Template",
      description: firstTab?.intro?.trim() || `${tabs.length} tab(s)`,
      sourceType: "generated-course",
      templateData: courseFormData
    };

    setCustomTopics((prev) => {
      if (!editingTopicId) {
        return [...prev, newTopic];
      }
      return prev.map((topic) => (topic.id === editingTopicId ? newTopic : topic));
    });
    //setEditingTopicId("");
    // setActiveTopicId(topicId);
    //setCurrentPage("topic-view");
  };

  const handleEditTopic = (topic) => {
    if (topic.sourceType !== "custom" && topic.sourceType !== "generated-course") {
      return;

    }

    setEditingTopicId(topic.id);
    setCurrentPage(topic.sourceType === "generated-course" ? "html-generator" : "add-topic");
  };
  const handleMenuSelect = (page) => {
    setEditingTopicId("");
    if (page === "tools") {
      setCurrentPage("tools-list");
      return;
    }
    setCurrentPage(page);
  };

  const handleTopicSelect = (topicId) => {
    setEditingTopicId("");
    setActiveTopicId(topicId);
    setCurrentPage("topic-view");
  };

  const handleBack = () => {
    if (currentPage === "topic-view") {
      setCurrentPage("tools-list");
      return;
    }
    setEditingTopicId("");
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
          onEditTopic={handleEditTopic}
        />
      ) : null}

      {currentPage === "topic-view" ? (
        <LearningViewer topic={activeTopic} onEditTopic={handleEditTopic} />
      ) : null}

      {currentPage === "add-topic" ? (
        <AddTopicForm
          onAddTopic={handleAddTopic}
          initialData={editingTopic?.sourceType === "custom" ? editingTopic : null}
          submitLabel={editingTopicId ? "Update Topic" : "Add Topic"}
        />
      ) : null}      {currentPage === "html-generator" ? (
        <HtmlCourseGenerator
          onSaveCourse={handleSaveGeneratedCourse}
          initialData={
            editingTopic?.sourceType === "generated-course" ? editingTopic.templateData : null
          }
          submitLabel={editingTopicId ? "Update Generated Course" : "Save To Learning Topics"}
        />
      ) : null}

      {currentPage === "settings" ? (
        <SettingsPage onBack={() => setCurrentPage("menu")} />
      ) : null}

    </main>
  );
}

export default App;
