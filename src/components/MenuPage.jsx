function MenuPage({ onSelectPage }) {
  const menuItems = [
    {
      id: "tools",
      label: "Learning Tools",
      icon: "📚",
      description: "Browse all learning modules"
    },
    {
      id: "add-topic",
      label: "Add Topic",
      icon: "➕",
      description: "Create new learning topics"
    },
    {
      id: "html-generator",
      label: "Generate Course",
      icon: "🎓",
      description: "Build course HTML content"
    },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙️",
      description: "Import and manage topics"
    }
  ];

  return (
    <section className="panel menu-panel">
      <h2 className="panel-title">Welcome to Learning Dashboard</h2>
      <p className="menu-subtitle">Choose what you want to do.</p>
      <div className="menu-actions">
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className="menu-button"
            onClick={() => onSelectPage(item.id)}
            title={item.description}
          >
            <span className="menu-button-icon">{item.icon}</span>
            <span className="menu-button-label">{item.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default MenuPage;
