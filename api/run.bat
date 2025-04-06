@echo off
ECHO IPL Predictions API Launcher

REM Check if Python is installed
python --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    ECHO Python is not installed. Please install Python 3.7 or later.
    EXIT /B 1
)

REM Create virtual environment if it doesn't exist
IF NOT EXIST venv (
    ECHO Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
CALL venv\Scripts\activate.bat

REM Install requirements
ECHO Installing dependencies...
pip install -r requirements.txt

REM Run the export_model script if models don't exist
IF NOT EXIST models\model_a.pkl (
    ECHO Exporting models...
    python export_model.py
)

REM Start the FastAPI application
ECHO Starting API server...
uvicorn main:app --reload

REM Deactivate virtual environment when the server is stopped
CALL venv\Scripts\deactivate.bat

PAUSE 