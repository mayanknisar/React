function Dashboard({ totalTopics = 0, customTopics = 0, generatedCourses = 0, recentTopics = [] }) {
    const stats = [
        {
            label: "Total Topics",
            value: totalTopics,
            icon: "📚",
            color: "#273c75"
        },
        {
            label: "Custom Topics",
            value: customTopics,
            icon: "➕",
            color: "#22863a"
        },
        {
            label: "Generated Courses",
            value: generatedCourses,
            icon: "🎓",
            color: "#0969da"
        }
    ];

    return (
        <section className="dashboard-panel" aria-label="Learning Dashboard Overview">
            <div className="dashboard-header">
                <h2 className="dashboard-title">Your Learning Overview</h2>
                <p className="dashboard-subtitle">Track your learning journey and quick stats</p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid" role="region" aria-label="Learning statistics">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="stat-card"
                        style={{ borderLeftColor: stat.color }}
                        aria-label={`${stat.label}: ${stat.value}`}
                    >
                        <div className="stat-icon">{stat.icon}</div>
                        <div className="stat-content">
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Topics */}
            {recentTopics.length > 0 && (
                <div className="recent-section" role="region" aria-label="Recently accessed topics">
                    <h3 className="section-title">Recently Accessed</h3>
                    <div className="recent-list">
                        {recentTopics.slice(0, 5).map((topic, index) => (
                            <div key={index} className="recent-item">
                                <span className="recent-icon">📖</span>
                                <div className="recent-content">
                                    <div className="recent-title">{topic.title}</div>
                                    <div className="recent-meta">{topic.category}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <div className="quick-actions" role="region" aria-label="Quick actions">
                <h3 className="section-title">Quick Actions</h3>
                <div className="action-buttons">
                    <button className="action-btn" aria-label="Start a new learning topic">
                        <span className="action-icon">📝</span>
                        <span>Create Topic</span>
                    </button>
                    <button className="action-btn" aria-label="Generate a new course">
                        <span className="action-icon">🎨</span>
                        <span>Generate Course</span>
                    </button>
                    <button className="action-btn" aria-label="Import topics">
                        <span className="action-icon">📥</span>
                        <span>Import Topics</span>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Dashboard;
