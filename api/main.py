import pandas as pd
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import OneHotEncoder
import pickle
import os
import uvicorn

# Initialize FastAPI app
app = FastAPI(
    title="IPL Predictions API",
    description="API for predicting six probability and match outcomes for IPL matches",
    version="1.0.0"
)

# Define request models
class MatchInput(BaseModel):
    ground: str
    team_a: str
    team_b: str

class BatsmanInput(BaseModel):
    name: str

class BowlerInput(BaseModel):
    name: str

# Load the model and encoder
def load_model():
    try:
        # Load the trained model
        model_a = pickle.load(open("models/model_a.pkl", "rb"))
        model_b = pickle.load(open("models/model_b.pkl", "rb"))
        model_win = pickle.load(open("models/model_win.pkl", "rb"))
        encoder = pickle.load(open("models/encoder.pkl", "rb"))
        return model_a, model_b, model_win, encoder
    except Exception as e:
        print(f"Error loading models: {e}")
        # If models don't exist, return None
        return None, None, None, None

# Create models directory if it doesn't exist
os.makedirs("models", exist_ok=True)

# Routes
@app.get("/")
def read_root():
    return {"message": "Welcome to IPL Predictions API"}

@app.post("/predict")
def predict_match(match_data: MatchInput):
    model_a, model_b, model_win, encoder = load_model()
    
    if model_a is None or model_b is None or model_win is None or encoder is None:
        raise HTTPException(status_code=500, detail="Models not found. Please train the models first.")
    
    try:
        # Prepare input data
        input_data = pd.DataFrame(
            [[match_data.ground, match_data.team_a, match_data.team_b]],
            columns=['Ground', 'Team A', 'Team B']
        )
        
        # Transform input using encoder
        input_encoded = encoder.transform(input_data).toarray()
        
        # Make predictions
        prob_a_six = model_a.predict_proba(input_encoded)[:, 1][0]
        prob_b_six = model_b.predict_proba(input_encoded)[:, 1][0]
        prob_a_win = model_win.predict_proba(input_encoded)[:, 1][0]
        prob_b_win = 1 - prob_a_win
        
        return {
            "team_a": match_data.team_a,
            "team_b": match_data.team_b,
            "ground": match_data.ground,
            "predictions": {
                f"{match_data.team_a}_six_probability": round(float(prob_a_six), 2),
                f"{match_data.team_b}_six_probability": round(float(prob_b_six), 2),
                f"{match_data.team_a}_win_probability": round(float(prob_a_win), 2),
                f"{match_data.team_b}_win_probability": round(float(prob_b_win), 2)
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.post("/train")
def train_model():
    try:
        # Load dataset
        df = pd.read_csv("IPLStats3updcsv1.csv")
        
        # Assigning weights based on row index
        df['weight'] = 1.0  # Default weight
        df.loc[75:145, 'weight'] = 1.5  # Medium importance
        df.loc[146:, 'weight'] = 2.0  # Highest importance
        
        # Encode categorical features
        encoder = OneHotEncoder(handle_unknown='ignore')
        encoded_features = encoder.fit_transform(df[['Ground', 'Team A', 'Team B']])
        
        # Prepare target variables
        target_six_a = df['Six by A'] > 0  # Binary: 1 if A hit sixes, else 0
        target_six_b = df['Six by B'] > 0  # Binary: 1 if B hit sixes, else 0
        target_win_a = df['Result'] == df['Team A']  # 1 if Team A wins, else 0
        
        # Train models
        model_a = RandomForestClassifier(n_estimators=100, random_state=42)
        model_a.fit(encoded_features, target_six_a, sample_weight=df['weight'])
        
        model_b = RandomForestClassifier(n_estimators=100, random_state=42)
        model_b.fit(encoded_features, target_six_b, sample_weight=df['weight'])
        
        model_win = RandomForestClassifier(n_estimators=100, random_state=42)
        model_win.fit(encoded_features, target_win_a, sample_weight=df['weight'])
        
        # Save models
        pickle.dump(model_a, open("models/model_a.pkl", "wb"))
        pickle.dump(model_b, open("models/model_b.pkl", "wb"))
        pickle.dump(model_win, open("models/model_win.pkl", "wb"))
        pickle.dump(encoder, open("models/encoder.pkl", "wb"))
        
        return {"message": "Models trained and saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Training error: {str(e)}")

@app.post("/batsman")
def get_batsman_stats(batsman_data: BatsmanInput):
    try:
        # Check if batsman stats file exists, if not create it
        if not os.path.exists("batsman_stats.csv"):
            # Try to load deliveries.csv and generate stats
            try:
                df = pd.read_csv("deliveries.csv")
                
                # Add 'is_four' and 'is_six' columns
                df['is_four'] = (df['batsman_runs'] == 4).astype(int)
                df['is_six'] = (df['batsman_runs'] == 6).astype(int)
                
                # BATSMAN ANALYSIS
                batsman_stats = df.groupby('batter').agg({
                    'batsman_runs': ['sum', 'mean', 'max'],  # Total runs, Average runs, Highest score
                    'ball': 'count',  # Balls faced
                    'match_id': 'nunique',  # Matches played
                    'is_four': 'sum',  # Total 4s
                    'is_six': 'sum'  # Total 6s
                }).reset_index()
                
                batsman_stats.columns = ['batsman', 'total_runs', 'avg_runs', 'high_score', 'balls_faced', 'matches', 'fours', 'sixes']
                batsman_stats['strike_rate'] = (batsman_stats['total_runs'] / batsman_stats['balls_faced']) * 100
                
                # Save Stats
                batsman_stats.to_csv("batsman_stats.csv", index=False)
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Error generating batsman stats: {str(e)}")
        
        # Load batsman stats
        batsman_stats_df = pd.read_csv("batsman_stats.csv")
        
        # Filter for the requested batsman (case insensitive)
        player_data = batsman_stats_df[batsman_stats_df['batsman'].str.lower() == batsman_data.name.lower()]
        
        if player_data.empty:
            raise HTTPException(status_code=404, detail=f"Batsman {batsman_data.name} not found in the dataset")
        
        # Convert to dictionary and return
        batsman_dict = player_data.iloc[0].to_dict()
        
        # Format numbers
        batsman_dict['strike_rate'] = round(batsman_dict['strike_rate'], 2)
        batsman_dict['avg_runs'] = round(batsman_dict['avg_runs'], 2)
        
        return {
            "batsman": batsman_dict["batsman"],
            "stats": {
                "total_runs": int(batsman_dict["total_runs"]),
                "avg_runs": batsman_dict["avg_runs"],
                "high_score": int(batsman_dict["high_score"]),
                "balls_faced": int(batsman_dict["balls_faced"]),
                "matches": int(batsman_dict["matches"]),
                "fours": int(batsman_dict["fours"]),
                "sixes": int(batsman_dict["sixes"]),
                "strike_rate": batsman_dict["strike_rate"]
            }
        }
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Error processing batsman stats: {str(e)}")

@app.post("/bowler")
def get_bowler_stats(bowler_data: BowlerInput):
    try:
        # Check if bowler stats file exists, if not create it
        if not os.path.exists("bowler_stats.csv"):
            # Try to load deliveries.csv and generate stats
            try:
                df = pd.read_csv("deliveries.csv")
                
                # Filter out extras (only runs conceded off the bat count)
                df['bowler_runs'] = df['total_runs'] - df['extra_runs']
                
                # Count sixes in first two overs
                first_two_overs = df[df['over'] < 2]
                bowler_sixes = first_two_overs[first_two_overs['batsman_runs'] == 6].groupby('bowler')['batsman_runs'].count().reset_index()
                bowler_sixes.columns = ['bowler', 'sixes_in_first_two_overs']
                
                # Aggregate bowler statistics
                bowler_stats = df.groupby('bowler').agg(
                    matches=('match_id', 'nunique'),  # Matches played
                    innings=('match_id', 'count'),    # Innings bowled
                    balls=('ball', 'count'),          # Balls bowled
                    runs=('bowler_runs', 'sum'),      # Runs conceded
                    wickets=('is_wicket', 'sum')      # Wickets taken
                ).reset_index()
                
                # Calculate bowling averages, economy rates, and strike rates
                bowler_stats['avg'] = bowler_stats['runs'] / bowler_stats['wickets']
                bowler_stats['econ'] = (bowler_stats['runs'] / bowler_stats['balls']) * 6
                bowler_stats['sr'] = bowler_stats['balls'] / bowler_stats['wickets']
                
                # Best Bowling in an Innings (BBI) and Best Bowling in a Match (BBM)
                bbi = df.groupby(['bowler', 'match_id']).agg(wickets=('is_wicket', 'sum')).reset_index()
                bbi = bbi.groupby('bowler')['wickets'].max().reset_index()
                bbi.columns = ['bowler', 'BBI']
                
                bbm = df.groupby(['bowler', 'match_id']).agg(wickets=('is_wicket', 'sum')).groupby('bowler')['wickets'].max().reset_index()
                bbm.columns = ['bowler', 'BBM']
                
                # Merge all statistics
                final_stats = bowler_stats.merge(bbi, on='bowler', how='left').merge(bbm, on='bowler', how='left').merge(bowler_sixes, on='bowler', how='left')
                
                # Fill NaN values for cases where bowlers have no sixes conceded in first two overs
                final_stats['sixes_in_first_two_overs'] = final_stats['sixes_in_first_two_overs'].fillna(0)
                
                # Save Stats
                final_stats.to_csv("bowler_stats.csv", index=False)
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Error generating bowler stats: {str(e)}")
        
        # Load bowler stats
        bowler_stats_df = pd.read_csv("bowler_stats.csv")
        
        # Filter for the requested bowler (case insensitive)
        player_data = bowler_stats_df[bowler_stats_df['bowler'].str.lower() == bowler_data.name.lower()]
        
        if player_data.empty:
            raise HTTPException(status_code=404, detail=f"Bowler {bowler_data.name} not found in the dataset")
        
        # Convert to dictionary and return
        bowler_dict = player_data.iloc[0].to_dict()
        
        # Format numbers
        bowler_dict['avg'] = round(bowler_dict['avg'], 2)
        bowler_dict['econ'] = round(bowler_dict['econ'], 2)
        bowler_dict['sr'] = round(bowler_dict['sr'], 2)
        
        return {
            "bowler": bowler_dict["bowler"],
            "stats": {
                "matches": int(bowler_dict["matches"]),
                "innings": int(bowler_dict["innings"]),
                "balls": int(bowler_dict["balls"]),
                "runs": int(bowler_dict["runs"]),
                "wickets": int(bowler_dict["wickets"]),
                "avg": bowler_dict["avg"],
                "econ": bowler_dict["econ"],
                "sr": bowler_dict["sr"],
                "BBI": int(bowler_dict["BBI"]),
                "BBM": int(bowler_dict["BBM"]),
                "sixes_in_first_two_overs": int(bowler_dict["sixes_in_first_two_overs"])
            }
        }
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Error processing bowler stats: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 