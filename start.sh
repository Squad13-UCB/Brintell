#!/bin/bash

echo "Starting the Flask app..."
flask run --host=0.0.0.0 &

sleep 5

if [ -n "$NGROK_AUTHTOKEN" ]; then
    echo "Configuring Ngrok with provided authtoken..."
    ngrok authtoken "$NGROK_AUTHTOKEN"
fi

echo "Starting Ngrok tunnel..."
ngrok http 5000 &

sleep 5

NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url')

PROXY_URL="https://sv1.wproxy.info/proxy.php"
PROXY_URL="${PROXY_URL}/${NGROK_URL}"

if [ -n "$NGROK_URL" ]; then
    echo "Ngrok is now exposing your Flask app via WProxy.net. Access it at: $PROXY_URL"
else
    echo "Ngrok URL could not be retrieved. Please check the Ngrok logs for details."
fi

wait