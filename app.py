from flask import Flask, request, jsonify, send_from_directory
import openai
import os

app = Flask(__name__)

# Configuração da API OpenAI
# Substitua a chave abaixo pela sua chave de API OpenAI
openai.api_key = ''

@app.route('/')
def index():
    """
    Roteia para a página principal do projeto.
    Serve o arquivo 'chat-bot.html' da pasta 'templates'.
    """
    return send_from_directory('templates', 'chat-bot.html')

@app.route('/ask', methods=['POST'])
def ask_openai():
    """
    Roteia solicitações POST para a API OpenAI.
    Recebe uma pergunta do usuário, faz uma chamada à API OpenAI e retorna a resposta.
    """
    # Obtém os dados JSON da solicitação
    data = request.get_json()
    question = data.get('question')

    # Validação simples da pergunta
    if not question:
        # Retorna um erro se a pergunta estiver ausente
        return jsonify({"error": "Pergunta inválida"}), 400

    try:
        # Faz uma requisição à API da OpenAI usando o modelo selecionado
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": question}
            ]
        )

        # Obtém a resposta da OpenAI
        answer = response.choices[0].message['content'].strip()
        return jsonify({"response": answer})

    except Exception as e:
        # Retorna um erro se houver uma exceção
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Inicia o servidor Flask
    app.run(debug=True)
