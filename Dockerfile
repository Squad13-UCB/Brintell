FROM python:3.9-slim

WORKDIR /app

COPY . /app

RUN echo "Installing Python dependencies..." && \
    pip install --no-cache-dir -r requirements.txt

RUN echo "Installing system dependencies and setting up Ngrok repository..." && \
    apt-get update && \
    apt-get install -y curl gnupg unzip jq && \
    curl -sSL https://ngrok-agent.s3.amazonaws.com/ngrok.asc | tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && \
    echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | tee /etc/apt/sources.list.d/ngrok.list && \
    apt-get update && \
    apt-get install -y ngrok

EXPOSE 5000 4040

COPY start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]