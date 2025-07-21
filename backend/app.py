from flask import Flask, request, jsonify
from flask_cors import CORS
import whisper
import os
from transformers import pipeline
from deep_translator import GoogleTranslator
from werkzeug.utils import secure_filename
from datetime import datetime

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

whisper_model = whisper.load_model("base")

emotion_pipeline = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    top_k=None
)

analysis_history = []

@app.route('/api/analyze', methods=['POST'])
def analyze_audio():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "Empty filename"}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    try:
        result = whisper_model.transcribe(filepath)
        transcript = result['text'].strip()

        translated = GoogleTranslator(source='auto', target='en').translate(transcript)

        emotion_scores = emotion_pipeline(translated)[0]
        emotions = {item['label'].lower(): round(item['score'] * 100, 1) for item in emotion_scores}

        insight = {
            "id": len(analysis_history) + 1,
            "transcript": transcript,
            "translated": translated,
            "emotions": emotions,
            "timestamp": datetime.now().strftime("%d %B %Y, %I:%M %p")
        }
        analysis_history.append(insight)

        return jsonify(insight)

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "Failed to process audio"}), 500

@app.route('/api/history', methods=['GET'])
def get_history():
    return jsonify(analysis_history)

@app.route('/api/history/<int:insight_id>', methods=['DELETE'])
def delete_insight(insight_id):
    global analysis_history
    print(f"Request to delete insight with ID: {insight_id}")
    analysis_history = [item for item in analysis_history if item["id"] != insight_id]
    return jsonify({"message": "Deleted"})

if __name__ == '__main__':
    app.run(debug=True)
