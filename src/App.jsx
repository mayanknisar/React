import { useEffect, useMemo, useState } from "react";
import MainPage from "./components/MainPage";
import MenuPage from "./components/MenuPage";
import SettingsPage from "./components/SettingsPage";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/Settings" element={<SettingsPage />} />
        </Routes>
      </Router>
      /</>
  );
}

export default App;
