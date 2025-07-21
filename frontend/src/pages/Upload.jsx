import React, { useState } from "react";
import axios from "axios";

const UploadAudio = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    setIsAnalyzing(true);

    const formData = new FormData();
    formData.append("file", selectedFile); // must match backend key

    try {
      const res = await axios.post("http://localhost:5000/api/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(`✅ Transcript: ${res.data.transcript}`);
    } catch (err) {
      console.error(err);
      alert("❌ Error analyzing file");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 flex items-center">
          <span role="img" aria-label="headphones" className="mr-2">🎧</span>
          Upload Audio for Analysis
        </h1>
        <input
          type="file"
          accept=".mp3, .wav"
          onChange={handleFileChange}
          className="block w-full p-2 mb-4 bg-gray-700 rounded text-white"
        />
        <button
          onClick={handleUpload}
          disabled={isAnalyzing}
          className={`w-full py-2 px-4 rounded text-white font-semibold ${
            isAnalyzing ? "bg-green-700 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isAnalyzing ? "Analyzing..." : "Analyze"}
        </button>
      </div>
    </div>
  );
};

export default UploadAudio;
