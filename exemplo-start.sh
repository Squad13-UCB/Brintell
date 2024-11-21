#!/bin/bash

# Função para verificar dependências
check_dependencies() {
    if ! command -v flask &>/dev/null; then
        echo "Erro: Flask não está instalado ou não está no PATH."
        exit 1
    fi
    if ! command -v ngrok &>/dev/null; then
        echo "Erro: Ngrok não está instalado ou não está no PATH."
        exit 1
    fi
    if ! command -v jq &>/dev/null; then
        echo "Erro: jq não está instalado. Instale-o para continuar."
        exit 1
    fi
}

# Verificar dependências
check_dependencies

echo "Iniciando a aplicação Flask..."
flask run --host=0.0.0.0 --port=5000 &  # Substitua o 5000 por outra porta, se necessário

# Aguardar a inicialização do Flask
sleep 5

# Configurar e iniciar o Ngrok
if [ -n "$NGROK_AUTHTOKEN" ]; then
    echo "Configurando Ngrok com o token fornecido..."
    ngrok authtoken "$NGROK_AUTHTOKEN"
else
    echo "Aviso: NGROK_AUTHTOKEN não foi fornecido. O túnel será limitado."
fi

echo "Iniciando o túnel do Ngrok..."
ngrok http 5000 &

# Aguardar o Ngrok iniciar
sleep 5

# Obter a URL pública do Ngrok
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url')

if [ -n "$NGROK_URL" ]; then
    echo "O Ngrok agora está expondo sua aplicação Flask:"
    echo "URL Pública: $NGROK_URL"

    # Gerar a URL Proxy (opcional)
    if [ -n "$USE_PROXY" ]; then
        PROXY_URL="https://sv1.wproxy.info/proxy.php/$NGROK_URL"
        echo "Acesse via proxy WProxy.net: $PROXY_URL"
    fi
else
    echo "Erro: Não foi possível recuperar a URL do Ngrok. Verifique os logs para mais detalhes."
    exit 1
fi

# Esperar os processos
wait
