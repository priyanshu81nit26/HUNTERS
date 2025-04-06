import requests
import json

# API endpoint
BASE_URL = "http://127.0.0.1:8000"

def test_root():
    """Test the root endpoint"""
    response = requests.get(f"{BASE_URL}/")
    print("Root endpoint:", response.status_code)
    print(response.json())
    print()

def test_train():
    """Test the training endpoint"""
    response = requests.post(f"{BASE_URL}/train")
    print("Train endpoint:", response.status_code)
    print(response.json())
    print()

def test_predict(ground, team_a, team_b):
    """Test the prediction endpoint"""
    data = {
        "ground": ground,
        "team_a": team_a,
        "team_b": team_b
    }
    
    response = requests.post(f"{BASE_URL}/predict", json=data)
    print("Predict endpoint:", response.status_code)
    print(json.dumps(response.json(), indent=4))
    print()

def test_batsman(name):
    """Test the batsman stats endpoint"""
    data = {
        "name": name
    }
    
    response = requests.post(f"{BASE_URL}/batsman", json=data)
    print(f"Batsman stats for {name}:", response.status_code)
    if response.status_code == 200:
        print(json.dumps(response.json(), indent=4))
    else:
        print(response.json())
    print()

def test_bowler(name):
    """Test the bowler stats endpoint"""
    data = {
        "name": name
    }
    
    response = requests.post(f"{BASE_URL}/bowler", json=data)
    print(f"Bowler stats for {name}:", response.status_code)
    if response.status_code == 200:
        print(json.dumps(response.json(), indent=4))
    else:
        print(response.json())
    print()

if __name__ == "__main__":
    print("Testing IPL Predictions API...\n")
    
    # Test root endpoint
    test_root()
    
    # Uncomment to test training the models
    # test_train()
    
    # Test prediction endpoint with sample data
    test_predict("Mumbai", "MI", "CSK")
    test_predict("Chennai", "CSK", "RCB")
    test_predict("Lucknow", "LSG", "MI")
    
    # Test batsman stats endpoint
    test_batsman("RG Sharma")
    test_batsman("V Kohli")
    
    # Test bowler stats endpoint
    test_bowler("Sandeep Sharma")
    test_bowler("J Bumrah")
    
    print("Testing completed.") 