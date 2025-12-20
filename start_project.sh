#!/bin/bash

echo "=========================================="
echo "Starting SafeOR QMS System"
echo "=========================================="

# Trap Ctrl+C to kill both processes when you exit
trap 'kill %1; exit' SIGINT

# 1. Start Django Backend
echo "Starting Django Backend..."
source .venv/bin/activate
cd backend
python manage.py runserver &
BACKEND_PID=$!
cd ..

# 2. Wait a moment for Django
sleep 3

# 3. Start React Frontend (Root Folder)
echo "Starting React Frontend..."
# We are already in the root folder, so we just run npm
npm run dev

# Wait for backend to finish
wait $BACKEND_PID