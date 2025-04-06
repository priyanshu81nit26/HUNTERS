import pandas as pd
import numpy as np
import pickle
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import OneHotEncoder

# Create models directory
os.makedirs("models", exist_ok=True)

# Load dataset (adjust the path if needed)
try:
    df = pd.read_csv("IPLStats3updcsv1.csv")
    print("Dataset loaded successfully.")
except FileNotFoundError:
    print("Error: The dataset file 'IPLStats3updcsv1.csv' was not found.")
    print("Please make sure the file exists in the same directory as this script.")
    exit(1)

# Assigning weights based on row index
print("Preparing data...")
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
print("Training models...")
model_a = RandomForestClassifier(n_estimators=100, random_state=42)
model_a.fit(encoded_features, target_six_a, sample_weight=df['weight'])
print("Model A (Team A six prediction) trained.")

model_b = RandomForestClassifier(n_estimators=100, random_state=42)
model_b.fit(encoded_features, target_six_b, sample_weight=df['weight'])
print("Model B (Team B six prediction) trained.")

model_win = RandomForestClassifier(n_estimators=100, random_state=42)
model_win.fit(encoded_features, target_win_a, sample_weight=df['weight'])
print("Win prediction model trained.")

# Save models
print("Saving models...")
pickle.dump(model_a, open("models/model_a.pkl", "wb"))
pickle.dump(model_b, open("models/model_b.pkl", "wb"))
pickle.dump(model_win, open("models/model_win.pkl", "wb"))
pickle.dump(encoder, open("models/encoder.pkl", "wb"))
print("Models saved to the 'models' directory successfully.")

print("\nModel export complete. You can now use the FastAPI application to make predictions.") 