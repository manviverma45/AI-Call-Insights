import React, { useEffect, useState } from "react";
import "../styles/LiveCalls.css";
import axios from "axios";

const LiveCalls = () => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    console.log("LiveCalls mounted");

    axios
      .get("https://jsonplaceholder.typicode.com/comments?_limit=3")
      .then((res) => {
        console.log("Fetched calls:", res.data);
        setCalls(res.data);
      })
      .catch((err) => {
        console.error("Failed to load calls", err);
      });
  }, []);

  return (
    <div className="page-container">
      <div className="card">
        <h2>📞 Live Call Logs</h2>
        {calls.length > 0 ? (
          calls.map((call, idx) => (
            <div key={idx} className="log-item">
              <strong>{call.name}</strong>
              <p>{call.body}</p>
            </div>
          ))
        ) : (
          <div className="empty-message">
            📭 No live calls available right now.
            <br />
            Please check again later.
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveCalls;
