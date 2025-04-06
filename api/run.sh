#!/bin/bash

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "Python is not installed. Please install Python 3.7 or later."
    exit 1
fi

# Check if pip is installed
if ! command -v pip &> /dev/null; then
    echo "pip is not installed. Please install pip."
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
source venv/bin/activate || source venv/Scripts/activate

# Install requirements
echo "Installing dependencies..."
pip install -r requirements.txt

# Run the export_model script if models don't exist
if [ ! -d "models" ] || [ ! -f "models/model_a.pkl" ]; then
    echo "Exporting models..."
    python export_model.py
fi

# Start the FastAPI application
echo "Starting API server..."
uvicorn main:app --reload

# Deactivate virtual environment when the server is stopped
trap "deactivate" EXIT 