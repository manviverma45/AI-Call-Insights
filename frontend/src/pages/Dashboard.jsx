// src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="title">📊 AI Call Insights Dashboard</h1>
      <div className="card-grid">
        <Link to="/upload" className="card">
          <h2>🎙️ Upload Audio</h2>
          <p>Upload recorded calls for sentiment analysis</p>
        </Link>
        <Link to="/livecalls" className="card">
          <h2>📞 Live Calls</h2>
          <p>View and analyze live call data</p>
        </Link>
        <Link to="/insights" className="card">
          <h2>🧠 Insights</h2>
          <p>View AI-generated call insights and sentiments</p>
        </Link>
        <Link to="/settings" className="card">
          <h2>⚙️ Settings</h2>
          <p>Configure call sources and API keys</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
