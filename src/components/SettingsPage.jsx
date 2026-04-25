import { useState } from "react";

const STORAGE_KEY = "learning-dashboard-custom-topics";

const validateTopicsData = (data) => {
  if (!Array.isArray(data)) {
    return "Data must be an array of topics.";
  }
  for (let i = 0; i < data.length; i++) {
    const topic = data[i];
    if (typeof topic !== "object" || topic === null) {
      return `Topic at index ${i} must be an object.`;
    }
    if (typeof topic.id !== "string" || !topic.id) {
      return `Topic at index ${i} must have a valid 'id' string.`;
    }
    if (typeof topic.title !== "string" || !topic.title) {
      return `Topic at index ${i} must have a valid 'title' string.`;
    }
    if (typeof topic.category !== "string" || !topic.category) {
      return `Topic at index ${i} must have a valid 'category' string.`;
    }
    if (typeof topic.level !== "string" || !topic.level) {
      return `Topic at index ${i} must have a valid 'level' string.`;
    }
    if (typeof topic.description !== "string" || !topic.description) {
      return `Topic at index ${i} must have a valid 'description' string.`;
    }
    if (typeof topic.sourceType !== "string" || !topic.sourceType) {
      return `Topic at index ${i} must have a valid 'sourceType' string.`;
    }
    // Add more validations as needed for other fields
  }
  return null; // Valid
};

function SettingsPage({ onBack, onAddTopics }) {
  const [importFile, setImportFile] = useState(null);
  const [importError, setImportError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingData, setPendingData] = useState(null);
  const [pendingMode, setPendingMode] = useState("replace");

  const toTopicArray = (data) => {
    if (Array.isArray(data)) return data;
    if (typeof data === "object" && data !== null) return [data];
    return null;
  };

  const createTopicId = (topic) => {
    const title = String(topic?.title ?? "imported-topic").trim() || "imported-topic";
    return `${title}-${Date.now()}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  };

  const normalizeImportedTopics = (data) => {
    const topics = toTopicArray(data);
    if (!topics) {
      return { error: "Expected a JSON object or an array of topic objects." };
    }

    const normalized = topics.map((topic) => {
      if (typeof topic !== "object" || topic === null) return topic;
      return {
        ...topic,
        id: typeof topic.id === "string" && topic.id.trim() ? topic.id : createTopicId(topic)
      };
    });

    const error = validateTopicsData(normalized);
    return { topics: normalized, error };
  };

  const handleExport = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      alert("No data to export.");
      return;
    }
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "learning-topics.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setImportFile(file);
    setImportError("");
  };

  const handleFileJson = (file, mode) => {
    if (!file) {
      setImportError("Please select a file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const { topics, error } = normalizeImportedTopics(data);
        if (error) {
          setImportError(error);
          return;
        }
        setPendingData(topics);
        setPendingMode(mode);
        setShowConfirm(true);
      } catch (err) {
        setImportError("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const handleImport = () => handleFileJson(importFile, "replace");
  const handleImportAsModule = () => handleFileJson(importFile, "append");

  const confirmImport = () => {
    if (pendingMode === "append") {
      if (typeof onAddTopics === "function") {
        onAddTopics(pendingData);
      } else {
        const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...existingData, ...pendingData]));
      }
      alert("Course module added successfully.");
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pendingData));
      alert("Data imported successfully. Please refresh the page to see changes.");
    }

    setShowConfirm(false);
    setPendingData(null);
    setImportFile(null);
  };

  const cancelImport = () => {
    setShowConfirm(false);
    setPendingData(null);
  };

  return (
    <section className="panel settings-panel">
      <h2 className="panel-title">Settings</h2>
      <div className="settings-actions">
        <button type="button" className="menu-button" onClick={handleExport}>
          Export Data
        </button>
        <div className="import-section">
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            style={{ marginBottom: "10px" }}
          />
          <div className="settings-buttons">
            <button type="button" className="menu-button" onClick={handleImport}>
              Import Data
            </button>
            <button type="button" className="menu-button" onClick={handleImportAsModule}>
              Add Course Module
            </button>
          </div>
          {importError && <p className="error-text">{importError}</p>}
        </div>
      </div>
      {showConfirm && (
        <div className="confirm-popup">
          <p>
            {pendingMode === "append"
              ? "Are you sure you want to add this course module to your existing custom topics?"
              : "Are you sure you want to import this data? This will replace your current custom topics."}
          </p>
          <button type="button" onClick={confirmImport}>Yes</button>
          <button type="button" onClick={cancelImport}>No</button>
        </div>
      )}
    </section>
  );
}

export default SettingsPage;
