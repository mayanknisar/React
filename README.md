# Learning Dashboard

A small React/Vite application for browsing and managing learning topics, generating HTML course content, and storing custom topic data in browser local storage.

## What this project is

This repo is a learning dashboard app built with:

- React 18
- Vite
- Browser `localStorage` for persistence

It provides a menu-driven interface where users can:

- view a list of learning topics
- open topic content and generated course HTML
- add or edit custom learning topics
- generate course HTML templates interactively
- import/export saved custom topics as JSON

## Key features

- **Menu navigation** through built-in pages and tools
- **Preloaded topic support** via `src/data/learningTopics.js`
- **Custom topic creation** using a structured form
- **Editable custom topics** (only user-created or generated items)
- **HTML course generator** with tabs, topics, blocks, and preview
- **Data persistence** with localStorage under the key `learning-dashboard-custom-topics`
- **Import/export settings** for custom topic JSON data

## Project structure

- `index.html` - Vite HTML entry point
- `package.json` - NPM scripts and dependencies
- `vite.config.js` - Vite configuration
- `src/main.jsx` - React application bootstrap
- `src/App.jsx` - Main app layout, navigation, and state management
- `src/styles.css` - Global application styles
- `src/components/` - UI components and form pages
  - `MenuPage.jsx` - Main menu with navigation buttons
  - `LearningList.jsx` - Topic list view with selection and edit actions
  - `LearningViewer.jsx` - Displays topic content, custom topic panels, or generated HTML
  - `AddTopicForm.jsx` - Form for creating and editing custom topics
  - `HtmlCourseGenerator.jsx` - Interactive HTML course builder and preview
  - `SettingsPage.jsx` - Import/export custom topic data
- `src/data/learningTopics.js` - Default learning topics loaded into the dashboard
- `src/utils/courseHtmlTemplate.js` - Generates HTML output for the course generator
- `htmls/` - Static HTML topic source files referenced by built-in topics

## How it works

1. On startup, `App.jsx` loads default topics and any saved custom topics from localStorage.
2. The app state tracks the current page, active topic, custom topics, and editing context.
3. `MenuPage` lets the user navigate to the learning tool list, add a topic, generate HTML, or open settings.
4. `LearningList` shows the combined list of default and custom topics.
5. `LearningViewer` renders:
   - built-in topic HTML from `htmls/` files
   - generated course HTML from `src/utils/courseHtmlTemplate.js`
   - custom topic details created through `AddTopicForm.jsx`
6. `HtmlCourseGenerator.jsx` creates a complete HTML course layout and allows saving it as a generated learning topic.
7. `SettingsPage.jsx` supports exporting custom topics to JSON and importing JSON to replace current saved data.

## Running the project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Notes

- The app is configured as a `private` Vite project and does not publish to npm.
- Custom topic editing is only available for topics created through the app or generated via the HTML course generator.
- Imported JSON must follow the custom topic schema expected by the app.

## Useful files

- `src/App.jsx` - main state and navigation logic
- `src/utils/courseHtmlTemplate.js` - HTML template generation and rendering logic
- `src/components/AddTopicForm.jsx` - custom topic editor schema and validation
- `src/components/HtmlCourseGenerator.jsx` - course builder UI
- `src/components/SettingsPage.jsx` - data import/export flow
