// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UploadAudio from "./pages/UploadAudio";
import LiveCalls from "./pages/LiveCalls";
import Insights from "./pages/Insights";
import Settings from "./pages/Settings";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<UploadAudio />} />
        <Route path="/livecalls" element={<LiveCalls />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
