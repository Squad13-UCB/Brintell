from flask import Flask, request, jsonify, send_from_directory
import openai
import os
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
import psycopg2
from psycopg2 import sql
from validation import validate_params, validate_password, validate_email, validate_nome

app = Flask(__name__)

# Permitir requisições de mesma origem com credenciais
CORS(app, supports_credentials=True)

# Configuração de headers e origins permitidos
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['JWT_SECRET_KEY'] = os.urandom(24)  # JWT secret key

jwt = JWTManager(app)

# Database connection configuration
def get_db_connection():
	conn = psycopg2.connect(
		host="localhost",
		database="brintelldb",
		user="user",
		password="1234"
	)
	return conn

# Configuração da API OpenAI

@app.route('/')
def index_html():
	"""
	Roteia para a página principal do projeto.
	Serve o arquivo 'chat-bot.html' da pasta 'templates'.
	"""
	return send_from_directory('templates', 'chat-bot.html')

@app.route('/chat-bot')
def chat_bot():
	"""
	Roteia para a página principal do projeto.
	Serve o arquivo 'chat-bot.html' da pasta 'templates'.
	"""
	return send_from_directory('templates', 'chat-bot.html')

@app.route('/cadastro')
def cadastro_html():
    return send_from_directory('templates', 'cadastro.html')

@app.route('/login')
def login_html():
    return send_from_directory('templates', 'login.html')

@app.route('/help')
def help_html():
    return send_from_directory('templates', 'help.html')

@app.route('/profile-user')
def profile_user_html():
    return send_from_directory('templates', 'profile-user.html')

@app.route('/settings-user')
def settings_user_html():
    return send_from_directory('templates', 'settings-user.html')

# Rota para fazer login e obter um token
@app.route('/login', methods=['POST'])
def login():
	data = request.get_json()
	email = data.get('email')
	senha = data.get('senha')

	if not email or not senha:
		return jsonify({"error": "Email e senha são obrigatórios"}), 400

	try:
		# Conecta na base de dados
		conn = get_db_connection()
		cur = conn.cursor()

		# Seleciona o usuário com base no email
		cur.execute("SELECT id, nome, email, data_criacao, ativo, senha FROM usuarios WHERE email = %s", (email,))
		usuario = cur.fetchone()
		print(usuario)
		usuario_dict = {
			"id": usuario[0],
			"nome": usuario[1],  
			"email": usuario[2],
			"data_criacao": usuario[3],
			"ativo": usuario[4],
		}

		# Fecha a conexão
		cur.close()
		conn.close()

		# Se o usuário existir, verifica a senha
		if usuario and check_password_hash(usuario[5], senha):
			access_token = create_access_token(identity=usuario[0])  # usuario[0] é o ID do usuário
			return jsonify(accessToken=access_token, usuario=usuario_dict), 200
		else:
			return jsonify({"error": "Credenciais inválidas"}), 401

	except Exception as e:
		return jsonify({"error": str(e)}), 500
    
# Rota para fazer cadastrar e obter um token
@app.route('/cadastrar', methods=['POST'])
def cadastrar():
	data = request.get_json()
	required_fields = {
		'email': validate_email,
		'senha': validate_password,
		'nome': validate_nome
	}
      
	is_valid, errors = validate_params(data, required_fields)

	# Se os parâmetros passados não forem válidos, retorna 400 junto com o erro
	if not is_valid:
		jsonify({"error": str(errors)}), 400

	try:
		# Conecta na base de dados
		conn = get_db_connection()
		cursor = conn.cursor()
            
		# Gera um hash a partir da senha
		senha_hash = generate_password_hash(data['senha'])
	
        # Consulta SQL para inserir os dados
		insert_query = sql.SQL("""
			INSERT INTO usuarios (email, senha, nome)
			VALUES (%s, %s, %s)
            RETURNING id, nome, email, data_criacao, ativo;
		""")

		# Executa a consulta com os parâmetros
		cursor.execute(insert_query, (data['email'], senha_hash, data['nome']))
		
		usuario = cursor.fetchone()
		usuario_dict = {
			"id": usuario[0],
			"nome": usuario[1],  
			"email": usuario[2],
			"data_criacao": usuario[3],
			"ativo": usuario[4],

		}
		# Confirma as alterações
		conn.commit()

		# Fecha a conexão
		cursor.close()
		conn.close()
            
		access_token = create_access_token(identity=usuario[0])
		return jsonify(accessToken=access_token, usuario=usuario_dict)
      
	except Exception as e:
		print(e)
		return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
	# Inicia o servidor Flask
	app.run(debug=True)