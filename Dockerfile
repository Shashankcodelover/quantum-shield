FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Ollama for local LLMs
RUN curl -fsSL https://ollama.ai/install.sh | sh
RUN ollama serve &
RUN sleep 10 && ollama pull phi3

COPY . .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]