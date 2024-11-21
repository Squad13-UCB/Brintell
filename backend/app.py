from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from os import urandom

load_dotenv()

app = Flask(__name__)

# Configuração do CORS
CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

# Configuração da biblioteca de autenticação
app.config['JWT_SECRET_KEY'] = urandom(24) 
jwt = JWTManager(app)

# Importação das rotas da aplicação
from routes import main as main_routes
app.register_blueprint(main_routes)
app.static_folder = '../static'

@app.errorhandler(Exception)
def handle_exception(error):
    print(error)
    # Otherwise, return a generic error message
    return jsonify({"error": "Internal Server Error", "message": str(error)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
