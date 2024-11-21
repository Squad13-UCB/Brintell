from flask import jsonify, request
from flask_jwt_extended import create_access_token
from db import get_db_connection
from utils.validation import validate_params, validate_password, validate_email, validate_text
from werkzeug.security import generate_password_hash, check_password_hash
from psycopg2 import sql

import os 
def cadastrar_admin():
	data = request.get_json()

	senha_empresa = os.environ.get('SENHA_EMPRESA')
	if senha_empresa != data['senha_admin']:
		return jsonify({"error": "Credenciais inválidas"}), 401

	required_fields = {
		'email': validate_email,
		'senha': validate_password,
		'nome': validate_text,
	}

	is_valid, errors = validate_params(data, required_fields)

	if not is_valid:
		return jsonify({"error": str(errors)}), 400

	try:
		conn = get_db_connection()
		# Começa a transaction
		conn.autocommit = False 
		
		cursor = conn.cursor()
		print(data['senha'])
		senha_hash = generate_password_hash(data['senha'])

		insert_query = sql.SQL("""
			INSERT INTO usuarios (nome, email, senha, tipo_conta, empresa_id)
			VALUES (%s, %s, %s, 'a', 1)
			RETURNING id
		""")

		cursor.execute(insert_query, (
			data['nome'],    # Nome do usuário
			data['email'],   # E-mail do usuário
			senha_hash,      # Senha em hash
		))

		insert_query_result = cursor.fetchone()

		select_query = sql.SQL(""" SELECT id, email FROM empresa WHERE id = 1; """)

		cursor.execute(select_query)

		select_query_result = cursor.fetchone()
		
		conn.commit()
		
		access_token = create_access_token(identity=insert_query_result[0])
		usuario = {
			"id": insert_query_result[0],
			"nome": data['nome'],
			"email": data['email'],
			"tipo_conta": 'a',
			"accessToken": access_token, 
			"empresa": {
				"id": 1,
				"nome": select_query_result[0],
				"email": select_query_result[1],
			}
		}

		conn.commit()
		cursor.close()
		conn.close()
		return jsonify({"sucesso": {"usuario": usuario}})

	except Exception as e:
		print(e)
		return jsonify({"error": str(e)}), 500
	
def atualizar_admin():
	data = request.get_json()

	required_fields = {
		'novo_email': validate_email,
	}

	is_valid, errors = validate_params(data, required_fields)

	if not is_valid:
		return jsonify({"error": str(errors)}), 400

	try:
		conn = get_db_connection()
		# Começa a transaction
		conn.autocommit = False 
		
		cursor = conn.cursor()

		update_query = sql.SQL("""
			UPDATE usuarios SET email = %s WHERE id = 2;
		""")

		cursor.execute(update_query, (
			data['novo_email'],   # E-mail do usuário
		))


		select_query = sql.SQL(""" 
			SELECT usuarios.*, empresa.* FROM usuarios
			JOIN empresa ON usuarios.empresa_id = empresa.id
			WHERE usuarios.id = 2;
		""")

		cursor.execute(select_query)

		select_query = cursor.fetchone()
		conn.commit()
		print(select_query)
		usuario = {
			"id": select_query[0],
			"nome": select_query[1],
			"email": select_query[2],
			"tipo_conta": select_query[6],
			"empresa": {
				"id": select_query[9],
				"nome": select_query[11],
				"email": select_query[10],
			}
		}

		cursor.close()
		conn.close()

		return jsonify({"sucesso": usuario})

	except Exception as e:
		print(e)
		return jsonify({"error": str(e)}), 500
	
def atualizar_senha():
	data = request.get_json()

	required_fields = {
		'nova_senha': validate_password,
		'senha_atual': validate_password,
	}

	is_valid, errors = validate_params(data, required_fields)

	if not is_valid:
		return jsonify({"error": str(errors)}), 400

	try:
		conn = get_db_connection()
		# Começa a transaction
		conn.autocommit = False 
		cursor = conn.cursor()

		select_query = sql.SQL(""" 
			SELECT senha FROM usuarios WHERE id = 2;
		""")

		cursor.execute(select_query)

		senha = cursor.fetchone()[0]

		if not check_password_hash(senha, data['senha_atual']):
			return jsonify({"error": "Senha incorreta!"}), 401

		senha_hash = generate_password_hash(data['nova_senha'])

		update_query = sql.SQL("""
			UPDATE usuarios SET senha = %s WHERE id = 2;
		""")

		cursor.execute(update_query, (senha_hash,))

		conn.commit()
		cursor.close()
		conn.close()

		return jsonify({"sucesso": "Senha atualizada com sucesso!"})

	except Exception as e:
		print(e)
		return jsonify({"error": str(e)}), 500

def mostrar_admins():
	data = request.get_json()

	try:
		conn = get_db_connection()
		# Começa a transaction
		conn.autocommit = False 
		cursor = conn.cursor()

		select_query = sql.SQL(""" 
			SELECT usuario.*, empresa.* FROM usuario
			JOIN empresa ON usuario.empresa_id = empresa.id
			WHERE usuario.id = 1;
		""")

		cursor.execute(select_query)

		select_query_result = cursor.fetchone()
		conn.commit()
		
		usuario = {
			"id": select_query_result[0],
			"nome": select_query_result[1],
			"email": select_query_result[2],
			"tipo_conta": select_query_result[3],
			"empresa": {
				"id": select_query_result[4],
				"nome": select_query_result[5],
				"email": select_query_result[6],
			}
		}

		conn.commit()
		cursor.close()
		conn.close()

		return jsonify({"sucesso": {"usuario": usuario}})

	except Exception as e:
		print(e)
		return jsonify({"error": str(e)}), 500
	
def mostrar_chamados():
	try:
		conn = get_db_connection()
		# Começa a transaction
		conn.autocommit = False 
		cursor = conn.cursor()

		# Atualiza somente chamados abertos
		select_query = sql.SQL("""
			SELECT c.id, u.nome, c.descricao, c.status, c.data, e.logradouro, e.cep, e.numero, admin.nome FROM chamados c
			JOIN enderecos e ON c.endereco_id = e.id
			JOIN usuarios u ON u.cliente_id = c.cliente_id
			LEFT JOIN usuarios admin ON admin.id = c.usuario_id
		""")

		cursor.execute(select_query)
		
		chamados = []
		select_query_result = cursor.fetchall()
		for chamado in select_query_result:
			print(chamado)
			chamados.append({
				"id": chamado[0],
				"nome": chamado[1],
				"descricao": chamado[2],
				"status": chamado[3],
				"data": chamado[4],
				"endereco": "{}, cep {}, numero {}".format(chamado[5], chamado[6], chamado[7]),
				"tecnico": "Chamado ainda não atendido" if chamado[8] == None else chamado[8],
			})

		cursor.close()
		conn.close()

		return jsonify({"sucesso": chamados})

	except Exception as e:
		print(e)
		return jsonify({"error": str(e)}), 500

def atualizar_chamado():
	try:
		conn = get_db_connection()
		# Começa a transaction
		conn.autocommit = False 
		cursor = conn.cursor()

		data = request.get_json()

		# Atualiza somente chamados abertos
		update_query = sql.SQL("""
			UPDATE chamados SET status = %s, usuario_id= %s WHERE id = %s
		""")

		cursor.execute(update_query, (data['status'], data['usuario_id'], data['chamado_id'],))

		conn.commit()
		cursor.close()
		conn.close()

		return jsonify({"sucesso": "Chamado atualizado com sucesso"})

	except Exception as e:
		print(e)
		return jsonify({"error": str(e)}), 500