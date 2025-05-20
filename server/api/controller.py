from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # <-- Bunu ekleyin
from pydantic import BaseModel
import joblib
import pandas as pd
import os
import json

# FastAPI uygulaması oluştur
app = FastAPI()

# CORS middleware'ı ekleyin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Gerekirse sadece frontend adresinizi yazın
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modellerin kaydedildiği klasör
MODEL_DIR = "saved_models"

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
    # Etiket dosyasını oku
    with open("labels.json", "r") as file:
        labels = json.load(file)

    # Sayısal pozisyonu string karşılığa çevir
    position_int = player_data.player_positions
    pos_label_map = labels["player_positions"]
    # Tersten çevir: {0: "CAM", 1: "CB", ..., 14: "ST"}
    reverse_pos_map = {v: k for k, v in pos_label_map.items()}

    if position_int not in reverse_pos_map:
        raise HTTPException(status_code=400, detail="Invalid player_positions code.")

    position_str = reverse_pos_map[position_int]

    # Model dosya yolu
    model_path = os.path.join(MODEL_DIR, f"{position_str}_model.pkl")

    # Model dosyasını kontrol et
    if not os.path.exists(model_path):
        raise HTTPException(status_code=404, detail=f"Model for position '{position_str}' not found.")

    # Gelen veriyi DataFrame'e dönüştür
    player_df = pd.DataFrame([player_data.dict()])

    # Modeli yükle
    model = joblib.load(model_path)

    # Tahmin yap
    try:
        prediction = model.predict(player_df)[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

    # Tahmini döndür
    return {
        "predicted_value_eur": round(prediction, 2)
    }