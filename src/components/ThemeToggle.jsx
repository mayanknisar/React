function ThemeToggle({ theme, onToggle }) {
    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={onToggle}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
            <span className="theme-icon">
                {theme === 'light' ? '🌙' : '☀️'}
            </span>
            <span className="theme-text">
                {theme === 'light' ? 'Dark' : 'Light'}
            </span>
        </button>
    );
}

export default ThemeToggle;