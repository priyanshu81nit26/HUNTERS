# IPL Predictions API

A FastAPI wrapper for predicting IPL match outcomes and six-hitting probabilities in the first two overs of cricket matches.

## Features

- Predict the probability of teams hitting sixes in the first two overs
- Predict match win probabilities
- Get detailed statistics for batsmen and bowlers
- Simple REST API interface
- Based on machine learning models trained on historical IPL data

## Installation

1. Clone this repository
2. Install the required dependencies:

```bash
pip install -r requirements.txt
```

3. Make sure you have the following data files in the root directory:
   - `IPLStats3updcsv1.csv` (for match predictions)
   - `deliveries.csv` (for player statistics)

## Usage

### Export the Models

Before using the API, you need to export the models from your training data:

```bash
python export_model.py
```

This will create the necessary model files in the `models` directory.

### Start the API Server

Run the FastAPI application:

```bash
uvicorn main:app --reload
```

The API will be available at http://127.0.0.1:8000

### API Endpoints

#### 1. Home
- **URL**: `/`
- **Method**: `GET`
- **Description**: Welcome message

#### 2. Train Models
- **URL**: `/train`
- **Method**: `POST`
- **Description**: Train and save models using the dataset

#### 3. Predict
- **URL**: `/predict`
- **Method**: `POST`
- **Description**: Get predictions for a match
- **Request Body**:
  ```json
  {
    "ground": "Lucknow",
    "team_a": "LSG",
    "team_b": "MI"
  }
  ```
- **Response**:
  ```json
  {
    "team_a": "LSG",
    "team_b": "MI",
    "ground": "Lucknow",
    "predictions": {
      "LSG_six_probability": 0.71,
      "MI_six_probability": 0.80,
      "LSG_win_probability": 0.78,
      "MI_win_probability": 0.22
    }
  }
  ```

#### 4. Batsman Stats
- **URL**: `/batsman`
- **Method**: `POST`
- **Description**: Get detailed statistics for a specific batsman
- **Request Body**:
  ```json
  {
    "name": "RG Sharma"
  }
  ```
- **Response**:
  ```json
  {
    "batsman": "RG Sharma",
    "stats": {
      "total_runs": 1398,
      "avg_runs": 1.28,
      "high_score": 6,
      "balls_faced": 1092,
      "matches": 57,
      "fours": 141,
      "sixes": 67,
      "strike_rate": 128.02
    }
  }
  ```

#### 5. Bowler Stats
- **URL**: `/bowler`
- **Method**: `POST`
- **Description**: Get detailed statistics for a specific bowler
- **Request Body**:
  ```json
  {
    "name": "Sandeep Sharma"
  }
  ```
- **Response**:
  ```json
  {
    "bowler": "Sandeep Sharma",
    "stats": {
      "matches": 34,
      "innings": 797,
      "balls": 797,
      "runs": 1030,
      "wickets": 36,
      "avg": 28.61,
      "econ": 7.75,
      "sr": 22.14,
      "BBI": 5,
      "BBM": 5,
      "sixes_in_first_two_overs": 4
    }
  }
  ```

### Interactive API Documentation

FastAPI automatically generates interactive API documentation:
- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

## Testing

You can test the API using the provided test script:

```bash
python test_api.py
```

This will test all endpoints with sample data.

## Requirements

- Python 3.7+
- FastAPI
- Uvicorn
- Pandas
- NumPy
- scikit-learn
- Pydantic

## License

MIT 