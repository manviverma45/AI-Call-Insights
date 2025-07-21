import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/BoxPages.css";
import "../styles/Insights.css";

const Insights = () => {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/history");
      setInsights(res.data.reverse());
    } catch (error) {
      console.error("Failed to fetch insights", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/history/${id}`);
      if (response.data.message === "Deleted") {
        setInsights((prev) => prev.filter((insight) => insight.id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="insights-container">
      <h1 className="insight-heading">Insight History</h1>

      {insights.length === 0 ? (
        <p className="no-insights">No uploads yet.</p>
      ) : (
        <div className="insight-cards">
          {insights.map((insight) => (
            <div className="insight-card" key={insight.id}>
              <div className="card-header">
                <span className="timestamp">🕒 {insight.timestamp}</span>
                <button className="delete-btn" onClick={() => handleDelete(insight.id)}>
                  Delete
                </button>
              </div>
              <div className="card-body">
                <p><strong>Transcript:</strong> {insight.transcript}</p>
                <p><strong>Translated:</strong> {insight.translated}</p>
                <div>
                  <strong>Emotions (sorted):</strong>
                  <ul>
                    {Object.entries(insight.emotions)
                      .sort((a, b) => b[1] - a[1])
                      .map(([emotion, score]) => (
                        <li key={emotion}>{emotion}: {score}%</li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Insights;
