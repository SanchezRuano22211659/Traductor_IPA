FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend files
COPY . .

# Environment config
ENV PYTHONPATH=/app
ENV PORT=8000
ENV MODEL_PATH=/app/g2p_model.pt
ENV VOCAB_PATH=/app/g2p_vocab.json

EXPOSE 8000

CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]
