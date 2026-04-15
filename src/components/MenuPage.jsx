function MenuPage({ onSelectPage }) {
  return (
    <section className="panel menu-panel">
      <h2 className="panel-title">Menu</h2>
      <p className="menu-subtitle">Choose what you want to do.</p>
      <div className="menu-actions">
        <button type="button" className="menu-button" onClick={() => onSelectPage("tools")}>
          Open Learning Tools
        </button>
        <button type="button" className="menu-button" onClick={() => onSelectPage("add-topic")}>
          Add New Learning Topic
        </button>
        <button
          type="button"
          className="menu-button"
          onClick={() => onSelectPage("html-generator")}
        >
          Generate Course HTML
        </button>
      </div>
    </section>
  );
}

export default MenuPage;
