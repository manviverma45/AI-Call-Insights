import whisper
from transformers import pipeline
from keybert import KeyBERT
import os
import uuid
import json

# Load models once
asr_model = whisper.load_model("base")
sentiment_model = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
kw_model = KeyBERT()

def process_audio(audio_path):
    print(f"[INFO] Transcribing: {audio_path}")
    transcription = asr_model.transcribe(audio_path)
    text = transcription.get("text", "").strip()

    if not text:
        return {"error": "No speech detected in audio."}

    # Sentiment Analysis
    print(f"[INFO] Running sentiment analysis...")
    sentiment_result = sentiment_model(text)[0]  # just one overall prediction

    # Keyword Extraction
    print(f"[INFO] Extracting keywords...")
    keywords = kw_model.extract_keywords(text, top_n=10, stop_words='english')
    keywords = [kw[0] for kw in keywords]

    # Result object
    result = {
        "transcript": text,
        "sentiment": {
            "label": sentiment_result["label"],
            "score": round(sentiment_result["score"], 2)
        },
        "keywords": keywords,
        "audio_file": os.path.basename(audio_path)
    }

    # Save result as JSON
    uid = str(uuid.uuid4())
    result_path = f"results/{uid}.json"
    with open(result_path, "w") as f:
        json.dump(result, f, indent=2)

    print(f"[INFO] Processing complete. Result saved to {result_path}")
    return result
