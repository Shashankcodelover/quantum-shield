#!/bin/bash
echo "🚀 Deploying Quantum Shield Backend..."
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
ollama serve &
sleep 10
ollama pull phi3
uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
docker-compose up -d
echo "✅ Quantum Shield Active: http://localhost:8000"