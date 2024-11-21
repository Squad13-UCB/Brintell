from flask import jsonify, request
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token
from db import get_db_connection

def login():
    data = request.get_json()
    email = data.get('email')
    senha = str(data.get('senha'))

    if not email or not senha:
        return jsonify({"error": "Email e senha são obrigatórios"}), 400

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            """ 
				SELECT u.id, u.nome, u.email, u.data_criacao, u.ativo, u.senha, u.tipo_conta, c.id
				FROM usuarios u
				LEFT JOIN clientes c ON u.cliente_id = c.id
				WHERE email = %s;
			""", 
        (email,))
        
        usuario = cur.fetchone()

        if usuario is None:
            return jsonify({"error": "Não existe uma conta com este email."}), 400
	
        if usuario and check_password_hash(usuario[5], senha):
            access_token = create_access_token(identity=usuario[0])
            return jsonify({
                "sucesso":{ 
					"usuario": {
						"accessToken": access_token, 
						"id": usuario[0], 
						"nome": usuario[1], 
						"email": usuario[2], 
						"tipo_conta": usuario[6],
                        "cliente_id": usuario[7],
                    }
				}
			}), 200
        else:
            return jsonify({"error": "Credenciais inválidas"}), 401

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500
