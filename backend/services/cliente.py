from flask import jsonify, request
from flask_jwt_extended import create_access_token
from db import get_db_connection
from utils.validation import validate_params, validate_password, validate_email, validate_text
from werkzeug.security import generate_password_hash
from psycopg2 import sql

def cadastrar_cliente():
	data = request.get_json()
	required_fields = {
		'email': validate_email,
		'senha': validate_password,
		'nome': validate_text,
		'cpf': validate_text,
		'logradouro': validate_text,
		'numero': validate_text,
		'cep': validate_text,
	}

	is_valid, errors = validate_params(data, required_fields)

	if not is_valid:
		return jsonify({"error": str(errors)}), 400

	try:
		conn = get_db_connection()
		# Começa a transaction
		conn.autocommit = False 
		
		cursor = conn.cursor()
		senha_hash = generate_password_hash(data['senha'])

		insert_query = sql.SQL("""
			WITH endereco AS (
				INSERT INTO enderecos (logradouro, cep, numero)
				VALUES (%s, %s, %s)
				RETURNING id AS endereco_id
			),
			cliente AS (
				INSERT INTO clientes (cpf, telefone, endereco_id)
				VALUES (%s, %s, (SELECT endereco_id FROM endereco))
				RETURNING id AS cliente_id
			),
			usuario AS (
				INSERT INTO usuarios (nome, email, senha, tipo_conta, cliente_id)
				VALUES (%s, %s, %s, 'c', (SELECT cliente_id FROM cliente))
				RETURNING id AS usuario_id
			)
                        
			SELECT usuario_id, cliente_id, endereco_id FROM usuario, cliente, endereco;
		""")

		cursor.execute(insert_query, (
			data['logradouro'],
			data['cep'],
			data['numero'],
			data['cpf'],
			data['telefone'],
			data['nome'],
			data['email'],
			senha_hash,
		))

		insert_query_result = cursor.fetchone()
		print(insert_query_result)
		update_query = sql.SQL("""             
			UPDATE usuarios
			SET cliente_id = %s
			WHERE id = %s;
							
			UPDATE enderecos
			SET cliente_id = %s
			WHERE id = %s;            
		""")
		
		cursor.execute(update_query, (insert_query_result[1], insert_query_result[0], insert_query_result[1], insert_query_result[2]))
		
		conn.commit()

		access_token = create_access_token(identity=insert_query_result[0])
		usuario = {
			"id": insert_query_result[1],
			"cliente_id": insert_query_result[2],
			"nome": data['nome'],
			"email": data['email'],
			"cpf": data['cpf'],
			"telefone": data['telefone'],
			"tipo_conta": "c",
			"accessToken": access_token, 
			"endereco": {
				"logradouro": data['logradouro'],
				"cep": data['cep'],
				"numero": data['numero'],
			}
		}

		conn.commit()
		cursor.close()
		conn.close()

		return jsonify({"sucesso": {"usuario": usuario}})

	except Exception as e:
		print(e)
		return jsonify({"error": str(e)}), 500
	
def mostrar_cliente(usuario_id):
	try:
		conn = get_db_connection()

		cursor = conn.cursor()

		query = """
		SELECT 
			usuarios.id AS usuario_id,
			usuarios.nome,
			usuarios.email,
			usuarios.tipo_conta,
			clientes.id AS cliente_id,
			clientes.cpf,
			clientes.telefone,
			enderecos.logradouro,
			enderecos.cep,
			enderecos.numero
		FROM usuarios
		JOIN clientes ON usuarios.cliente_id = clientes.id
		JOIN enderecos ON clientes.endereco_id = enderecos.id
		WHERE usuarios.tipo_conta = 'C' AND usuario.id=%s;
		"""
		cursor.execute(query, (usuario_id,))

		select_result = cursor.fetchone()

		usuario = {
			"id": select_result[0],
			"nome": select_result[1],
			"email": select_result[2],
			"tipo_conta": select_result[3],
			"client_id": select_result[4],
			"cpf": select_result[5],
			"telefone": select_result[6],
			"endereco": {
				"logradouro": select_result[7],
				"cep": select_result[8],
				"numero": select_result[9],
			}
		}

		cursor.close()
		conn.close()
		return jsonify({"sucesso": {"usuario": usuario}})

	except Exception as e:
		print(e)
		return jsonify({"error": str(e)}), 500

def create_feedback():
	try:
		data = request.get_json()
		conn = get_db_connection()
		conn.autocommit = False
		cursor = conn.cursor()

		select_query = sql.SQL("""
			SELECT * FROM feedback
			WHERE feedback.cliente_id = %s;
		""")

		cursor.execute(select_query, (data['cliente_id'],))
		result = cursor.fetchone()

		if result == None:
			insert_query = sql.SQL(
				"""
				INSERT INTO feedback (cliente_id, avaliacao, comentario)
				VALUES (%s, %s, %s)
				RETURNING id;
				"""
			)
			cursor.execute(insert_query, (
				data["cliente_id"],
				data["avaliacao"],
				data["comentario"],
			))
		else:
			update_query = sql.SQL(
				"""
				UPDATE feedback
				SET comentario = %s,
				avaliacao = %s
				WHERE feedback.cliente_id = %s;
				"""
			)
			cursor.execute(update_query, (
				data["comentario"],
				data["avaliacao"],
				data["cliente_id"],
			))


		conn.commit()
		cursor.close()
		conn.close()
		return jsonify({
			"sucesso": "Obrigado pelo feedback!", 
		}), 200
		
	except Exception as e:
		print(e)
		return jsonify({"error": str(e)}), 500


def update_feedback():
	try:
		data = request.get_json()
		conn = get_db_connection()
		conn.autocommit = False
		cursor = conn.cursor()

		insert_query = sql.SQL(
			"""
			UPDATE feedback
			SET comentario = %s
			SET avaliacao = %s
			WHERE id = %s;
			"""
		)
		cursor.execute(insert_query, (
			data["comentario"],
			data["avaliacao"],
			data["usuario_id"],
		))

		# Commit da transação
		conn.commit()

		# Obter o resultado da inserção
		insert_query_result = cursor.fetchone()

		jsonify({
			"sucesso": {"mensagem": "Obrigado pelo feedback!", "feedback_id": insert_query_result[0]}
		
		}), 200
		
	except Exception as e:
		print(e)
		return jsonify({"error": str(e)}), 500
	
def mostrar_feedback(cliente_id):
	try:
		conn = get_db_connection()
		conn.autocommit = False
		cursor = conn.cursor()

		search_query = sql.SQL(
			"""
			SELECT id, avaliacao, comentario FROM feedback WHERE feedback.cliente_id = %s;
			"""
		)

		cursor.execute(search_query, (cliente_id,))
		insert_query_result = cursor.fetchone()
		print(insert_query_result)
		if insert_query_result != None:
			return jsonify({"sucesso":  {
						"id": insert_query_result[0],
						"avaliacao": insert_query_result[1],
						"comentario": insert_query_result[2]
					}
			}), 200
		else:
			return jsonify({"sucesso":  {}}), 200

		
	except Exception as e:
		print(e)
		return jsonify({"error": str(e)}), 500
