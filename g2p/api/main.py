import os
import json
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import torch

from g2p_core import G2PModel, load_vocab, predict as model_predict

load_dotenv()

# Global variables
model = None
vocab = None
max_src = 30

@asynccontextmanager
async def lifespan(app: FastAPI):
    global model, vocab, max_src
    
    # Use absolute paths based on the current file location to ensure robust loading
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    model_path = os.getenv("MODEL_PATH", os.path.join(base_dir, "g2p_model.pt"))
    vocab_path = os.getenv("VOCAB_PATH", os.path.join(base_dir, "g2p_vocab.json"))
    
    if not os.path.exists(model_path):
        raise RuntimeError(f"Model file not found at {model_path}")
    if not os.path.exists(vocab_path):
        raise RuntimeError(f"Vocab file not found at {vocab_path}")
        
    vocab = load_vocab(vocab_path)
    with open(vocab_path, "r", encoding="utf-8") as f:
        vdata = json.load(f)
    max_src = vdata.get("max_src", 30)
    
    input_size = len(vocab["letters"])
    output_size = len(vocab["ipa_symbols"])
    
    model = G2PModel(input_size, output_size)
    model.load_state_dict(torch.load(model_path, map_location="cpu"))
    model.eval()
    
    yield
    
app = FastAPI(lifespan=lifespan, title="Traductor IPA API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictRequest(BaseModel):
    text: str

class WordResult(BaseModel):
    word: str
    ipa: str

class PredictResponse(BaseModel):
    input: str
    results: list[WordResult]
    phrase_ipa: str

@app.post("/predict", response_model=PredictResponse)
async def predict_endpoint(request: PredictRequest):
    text = request.text.strip()
    if not text:
        raise HTTPException(status_code=422, detail="texto vacío o inválido")
        
    words = text.lower().split()
    results = []
    phrase_ipa_parts = []
    
    try:
        for w in words:
            ipa = model_predict(w, model, vocab, max_src)
            results.append(WordResult(word=w, ipa=ipa))
            phrase_ipa_parts.append(ipa)
            
        return PredictResponse(
            input=text,
            results=results,
            phrase_ipa=" ".join(phrase_ipa_parts)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail="error interno del modelo")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("api.main:app", host="0.0.0.0", port=port, reload=True)
