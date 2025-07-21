import React, { useState } from "react";
import "../styles/Settings.css";

const Settings = () => {
  const [format, setFormat] = useState(localStorage.getItem("preferred_format") || "mp3");
  const [language, setLanguage] = useState(localStorage.getItem("transcription_lang") || "en");
  const [apiURL, setApiURL] = useState(localStorage.getItem("api_url") || "");

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
    localStorage.setItem("preferred_format", e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    localStorage.setItem("transcription_lang", e.target.value);
  };

  const handleClearHistory = () => {
    localStorage.removeItem("call_insights_history");
    alert("All call insights cleared.");
  };

  const handleApiChange = (e) => {
    setApiURL(e.target.value);
    localStorage.setItem("api_url", e.target.value);
  };

  return (
    <div className="settings-container">
      <div className="settings-box">
        <h2>⚙️ Settings</h2>
        <p>Manage API keys, audio formats, and account details.</p>

        <div className="setting-group">
          <label>🎧 Preferred Audio Format:</label>
          <select value={format} onChange={handleFormatChange}>
            <option value="mp3">MP3</option>
            <option value="wav">WAV</option>
            <option value="ogg">OGG</option>
          </select>
        </div>

        <div className="setting-group">
          <label>🌍 Transcription Language:</label>
          <select value={language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div className="setting-group">
          <label>🔗 API Endpoint (optional):</label>
          <input
            type="text"
            value={apiURL}
            onChange={handleApiChange}
            placeholder="http://localhost:5000/api/analyze"
          />
        </div>

        <button className="clear-btn" onClick={handleClearHistory}>
          🗑 Clear All Insights
        </button>
      </div>
    </div>
  );
};

export default Settings;
