#!/bin/bash

# Ruota schermo
xrandr --output HDMI-1 --rotate left

# Python AI
#cd /home/kioskuser/ai-server
#source venv/bin/activate
#uvicorn app:app --host 0.0.0.0 --port 8000 &
#PYTHON_PID=$!
#deactivate

# Vite
cd /home/kioskuser/totem-AIDO/progettoTotemAido
npm run dev &
VITE_PID=$!

# Attesa Vite
for i in $(seq 1 30); do
  curl -s http://localhost:5173 && break
  sleep 1
done

# Chromium kiosk (FIX PORTA)
chromium-browser \
  --kiosk \
  --no-sandbox \
  --disable-infobars \
  --no-first-run \
  --touch-events=enabled \
  --app=http://localhost:5173

# Cleanup
kill $VITE_PID
#kill $PYTHON_PID