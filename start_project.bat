@echo off
echo ==========================================
echo       Starting SafeOR QMS System
echo ==========================================

echo Starting Django Backend...
start "SafeOR Backend" cmd /k "call .venv\Scripts\activate.bat && cd backend && python manage.py runserver"

echo Starting React Frontend...
start "SafeOR Frontend" cmd /k "npm run dev"

echo.
echo ==========================================
echo Servers are starting...
echo Backend: http://127.0.0.1:8000
echo Frontend: http://localhost:5173
echo ==========================================
echo.
pause
