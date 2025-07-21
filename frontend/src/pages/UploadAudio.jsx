import React, { useState } from "react";
import "../styles/UploadAudio.css";

const UploadAudio = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setResult(null); // reset previous result
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an audio file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile); // IMPORTANT: key must be "file"

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || "Upload failed.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setResult(data);
      setLoading(false);

      // Save to localStorage for Insights page
      const stored = localStorage.getItem("call_insights_history");
      const updated = stored ? JSON.parse(stored) : [];
      updated.push({
        transcript: data.transcript,
        translated: data.translated,
        emotions: Object.entries(data.emotions).map(([label, score]) => ({
          label,
          score: score / 100,
        })),
      });
      localStorage.setItem("call_insights_history", JSON.stringify(updated));
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong while uploading.");
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h2>🎧 Upload Call Audio</h2>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {result && (
        <div className="result-box">
          <h3>🎙️ Transcript:</h3>
          <p>{result.transcript}</p>

          {result.translated && result.translated !== result.transcript && (
            <>
              <h3>🌐 Translated (for emotion detection):</h3>
              <p>{result.translated}</p>
            </>
          )}

          <h3>🧠 Emotions:</h3>
          <ul>
            {result.emotions && typeof result.emotions === "object" ? (
              Object.entries(result.emotions).map(([label, score], idx) => (
                <li key={idx}>
                  {label}: {score}%
                </li>
              ))
            ) : (
              <li>No emotions detected.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadAudio;
