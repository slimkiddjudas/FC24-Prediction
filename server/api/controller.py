from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import os
import json
from pathlib import Path

# FastAPI uygulaması oluştur
app = FastAPI()

# CORS middleware'ı ekleyin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dosya yollarını düzelt
BASE_DIR = Path(__file__).parent
SERVER_DIR = BASE_DIR.parent  # server klasörü
MODEL_DIR = SERVER_DIR / "saved_models"
LABELS_PATH = BASE_DIR / "labels.json"

# Debug için dosya yollarını yazdır
print(f"BASE_DIR: {BASE_DIR}")
print(f"SERVER_DIR: {SERVER_DIR}")
print(f"MODEL_DIR: {MODEL_DIR}")
print(f"LABELS_PATH: {LABELS_PATH}")
print(f"Model directory exists: {MODEL_DIR.exists()}")
print(f"Labels file exists: {LABELS_PATH.exists()}")

# Model dosyalarını listele
if MODEL_DIR.exists():
    model_files = list(MODEL_DIR.glob("*.pkl"))
    print(f"Found model files: {[f.name for f in model_files]}")

# Gelen futbolcu verileri için Pydantic modeli
class PlayerData(BaseModel):
    player_positions: int
    age: int
    height_cm: int
    weight_kg: int
    preferred_foot: int
    weak_foot: int
    skill_moves: int
    international_reputation: int
    work_rate: int
    pace: float
    shooting: float
    passing: float
    dribbling: float
    defending: float
    physic: float
    attacking_crossing: int
    attacking_finishing: int
    attacking_heading_accuracy: int
    attacking_short_passing: int
    attacking_volleys: int
    skill_dribbling: int
    skill_curve: int
    skill_fk_accuracy: int
    skill_long_passing: int
    skill_ball_control: int
    movement_acceleration: int
    movement_sprint_speed: int
    movement_agility: int
    movement_reactions: int
    movement_balance: int
    power_shot_power: int
    power_jumping: int
    power_stamina: int
    power_strength: int
    power_long_shots: int
    mentality_aggression: int
    mentality_interceptions: int
    mentality_positioning: int
    mentality_vision: int
    mentality_penalties: int
    mentality_composure: float
    defending_marking_awareness: int
    defending_standing_tackle: int
    defending_sliding_tackle: int
    goalkeeping_diving: int
    goalkeeping_handling: int
    goalkeeping_kicking: int
    goalkeeping_positioning: int
    goalkeeping_reflexes: int
    goalkeeping_speed: int

# Endpoint: Futbolcu verilerini al ve tahmin yap
@app.post("/predict")
def predict(player_data: PlayerData):
    try:
        # Etiket dosyasını oku
        if not LABELS_PATH.exists():
            raise HTTPException(status_code=500, detail=f"Labels file not found at {LABELS_PATH}")
            
        with open(LABELS_PATH, "r") as file:
            labels = json.load(file)

        # Sayısal pozisyonu string karşılığa çevir
        position_int = player_data.player_positions
        pos_label_map = labels["player_positions"]
        reverse_pos_map = {v: k for k, v in pos_label_map.items()}

        if position_int not in reverse_pos_map:
            raise HTTPException(
                status_code=400, 
                detail=f"Invalid player_positions code: {position_int}. Valid codes: {list(reverse_pos_map.keys())}"
            )

        position_str = reverse_pos_map[position_int]

        # Model dosya yolu
        model_path = MODEL_DIR / f"{position_str}_model.pkl"

        print(f"Looking for model at: {model_path}")
        print(f"Model exists: {model_path.exists()}")

        # Model dosyasını kontrol et
        if not model_path.exists():
            available_models = [f.stem.replace('_model', '') for f in MODEL_DIR.glob("*_model.pkl")]
            raise HTTPException(
                status_code=404, 
                detail=f"Model for position '{position_str}' not found at {model_path}. Available models: {available_models}"
            )

        # Gelen veriyi DataFrame'e dönüştür
        player_df = pd.DataFrame([player_data.dict()])

        # Modeli yükle
        model = joblib.load(str(model_path))

        # Tahmin yap
        prediction = model.predict(player_df)[0]

        return {
            "predicted_value_eur": round(prediction, 2),
            "position": position_str,
            "model_path": str(model_path)
        }

    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

# Test endpoint'i ekleyelim
@app.get("/models")
def list_models():
    """Mevcut modelleri listele"""
    if not MODEL_DIR.exists():
        return {"error": f"Model directory not found: {MODEL_DIR}"}
    
    model_files = list(MODEL_DIR.glob("*.pkl"))
    return {
        "model_directory": str(MODEL_DIR),
        "available_models": [f.name for f in model_files],
        "labels_file": str(LABELS_PATH),
        "labels_exists": LABELS_PATH.exists()
    }

@app.get("/")
def root():
    return {"message": "FC24 Prediction API is running!"}