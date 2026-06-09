@echo off
echo Starting IR-VIS Fusion Analysis Platform...

echo Starting FastAPI Backend...
start cmd /k "cd backend && uvicorn main:app --host 0.0.0.0 --port 8000 --reload"

echo Starting Vite Frontend...
start cmd /k "npm run dev"

echo Both servers are starting in separate windows.
