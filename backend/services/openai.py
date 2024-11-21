from flask import jsonify, request
import openai
from db import get_db_connection
from utils.validation import validate_params, validate_required, validate_text
from services.funcoes import abrir_chamado, mostrar_meu_plano, cadastrar_plano, mostrar_planos, reagendar_chamado, cancelar_chamado, mostrar_chamado
from os import getenv
from flask_jwt_extended import get_jwt_identity
import json

# Configuração das funções disponíveis para o ChatGPT
functions = [
    {
        "name": "mostrar_planos",
        "description": "Mostra os planos disponíveis para o usuário escolher."
    },
    {
        "name": "mostrar_meu_plano",
        "description": "Mostra o plano atual do cliente."
    },
    {
        "name": "cadastrar_plano",
        "description": "Cadastra ou atualiza o plano de um usuário.",
        "parameters": {
            "type": "object",
            "properties": {
                "plano": {"type": "string", "description": "O nome do plano desejado pelo usuário"}
            },
            "required": ["plano"]
        }
    },
    {
        "name": "abrir_chamado",
        "description": "Função para registrar um pedido de visita técnica na residência do cliente. Sempre peça os parametros data e descricao",
        "parameters": {
            "type": "object",
            "properties": {
                "descricao": {"type": "string", "description": "Descrição do chamado"},
                "data": {"type": "string", "description": "A data que ele quer que o técnico compareça na residência"},
            },
            "required": ["descricao", "data"]
        }
    },
    {
        "name": "reagendar_chamado",
        "description": "Função para reagendar uma visita técnica já marcada",
        "parameters": {
            "type": "object",
            "properties": {
                "data": {"type": "string", "description": "A data que ele quer que o técnico compareça na residência"},
            },
            "required": ["descricao", "data"]
        }
    },
    {
        "name": "cancelar_chamado",
        "description": "Função para cancelar uma visita técnica já marcada",
        "parameters": {}
    },
    {
        "name": "mostrar_chamado",
        "description": "Função para mostrar a visita técnica já marcada",
        "parameters": {}
    },
]


# Configuração da API OpenAI
openai.api_key = getenv('OPEN_AI_KEY')
def ask_openai():
	data = request.get_json()
	pergunta = data.get('pergunta')
	conversa_id = data.get('conversa_id')
	usuario_id = data.get('usuario_id')
	cliente_id = data.get('cliente_id')
	print(data)

	if not pergunta:
		return jsonify({"error": "Pergunta inválida"}), 400

	try:
		conn = get_db_connection()
		cursor = conn.cursor()
		# usuario_id = get_jwt_identity()
		mensagens = []
		# Se não enviou conversa_id, é pq a conversa é nova. Então uma nova conversa é gerada
		if not conversa_id:
			cursor.execute(
				"INSERT INTO conversas (usuario_id) VALUES (%s) RETURNING id;",
				(usuario_id,)
			)
			conversa_id = cursor.fetchone()[0]

		else:
			# carrega o histórico de mensagens
			cursor.execute(
				"SELECT pergunta, resposta FROM interacoes WHERE conversa_id = %s;",
				(conversa_id,)
			)
			interacoes = cursor.fetchall()
			for interacao in interacoes:
				mensagens.append({"role": "user", "content": interacao[0]})
				mensagens.append({"role": "assistant", "content": interacao[1]})

		mensagens.append({"role": "user", "content": pergunta})

		resposta = enviar_mensagem(mensagens, cursor)

		# Obtém a resposta da OpenAI
		# resposta = resposta.choices[0].message['content'].strip()
		mensagem = resposta.choices[0].message
		# Verifica se há uma chamada de função
		if 'function_call' in mensagem:
			resposta = processar_funcoes(mensagem, cursor, cliente_id, conn)
		else: resposta = resposta.choices[0].message.content

		# salva a interação
		cursor.execute(
			"INSERT INTO interacoes (pergunta, resposta, conversa_id) VALUES (%s, %s, %s)", 
			(pergunta, resposta, conversa_id)
		)
		
		conn.commit()
		conn.close()

		return jsonify({"sucesso": {"resposta": resposta, "conversa_id": conversa_id}})

	except Exception as e:
		return jsonify({"error": str(e)}), 500

def processar_funcoes(mensagem, cursor, cliente_id, conn):
	print(cliente_id)

	nome_funcao = mensagem["function_call"]["name"]
	argumentos_funcao = json.loads(mensagem["function_call"].get("arguments", {}))
	print(cliente_id)
	if nome_funcao == "mostrar_planos":
		return mostrar_planos(cursor)
	
	elif nome_funcao == "mostrar_meu_plano":
		return mostrar_meu_plano(cursor, cliente_id)
				
	elif nome_funcao == "cadastrar_plano":
		return cadastrar_plano(cursor, conn, cliente_id, argumentos_funcao.get('plano'), enviar_mensagem)
	
	elif nome_funcao == "abrir_chamado":
		return abrir_chamado(cursor, conn, cliente_id, argumentos_funcao.get('descricao'), argumentos_funcao.get('data'))
	
	elif nome_funcao == "reagendar_chamado":
		return reagendar_chamado(cursor, conn, cliente_id, argumentos_funcao.get('data'))
	
	elif nome_funcao == "cancelar_chamado":
		return cancelar_chamado(cursor, conn, cliente_id)
	
	elif nome_funcao == "mostrar_chamado":
		return mostrar_chamado(cursor, conn, cliente_id)

def enviar_mensagem(mensagens, cursor):
	cursor.execute("SELECT max_tokens, temperature, top_p, instructions, model FROM configuracao_ia;")
	configuracao_ia = cursor.fetchone()

	# insere as instruções no início do array
	mensagens.insert(0, {"role": "system", "content": configuracao_ia[3]})

	# Faz uma requisição à API da OpenAI usando o modelo selecionado
	response = openai.ChatCompletion.create(
		model=configuracao_ia[4],
		max_tokens=configuracao_ia[0],
		temperature=configuracao_ia[1],
		top_p=configuracao_ia[2],
		messages=mensagens,
		functions=functions
	)
	return response

def mostrar_conversas(usuario_id):
	try:
		conn = get_db_connection()
		cursor = conn.cursor()

		# usuario_id = get_jwt_identity()
		cursor.execute(
			"""
				SELECT pergunta, resposta, data, c.id
				FROM usuarios u
				JOIN conversas c ON u.id = c.usuario_id
				JOIN interacoes i ON c.id = i.conversa_id
				WHERE u.id = %s;
			""",
			(usuario_id,) 
		)
		interacoes = cursor.fetchall()

		conversas = []

		# configura as conversas
		for interacao in interacoes:
			for conversa in conversas:
				# se o id já existir, armzena a interação no id existente
				if conversa.get("id") == interacao[3]: 
					conversa.get("interacoes").append({
						"pergunta": interacao[0],
						"resposta": interacao[1],
						"data": interacao[2],
					})
					break
			else:
				# se não, cria um novo objeto
				conversas.append({
					"id": interacao[3],
					"interacoes": [{
						"pergunta": interacao[0],
						"resposta": interacao[1],
						"data": interacao[2],
					}]
				})

		return jsonify({"sucesso": conversas})
	except Exception as e:
		return jsonify({"error": str(e)}), 500

def mostrar_conversa(conversa_id):
	conn = get_db_connection()
	cursor = conn.cursor()

	# usuario_id = get_jwt_identity()
	cursor.execute(
		"""
			SELECT pergunta, resposta, data
			FROM interacoes
			WHERE conversa_id = %s;
		""",
		(conversa_id,) 
	)
	interacoes = cursor.fetchall()

	conversa = {
		"id": conversa_id,
		"interacoes": []
	}

	# configura as conversas
	for interacao in interacoes:
		# se não, cria um novo objeto
		conversa.get("interacoes").append({
			"pergunta": interacao[0],
			"resposta": interacao[1],
			"data": interacao[2],
		})

	return jsonify({"sucesso": conversa})

def deletar_conversa(conversa_id):
	try:
		conn = get_db_connection()
		cursor = conn.cursor()

		# usuario_id = get_jwt_identity()
		cursor.execute(
			"""
				DELETE
				FROM interacoes
				WHERE conversa_id = %s;
			""",
			(conversa_id,) 
		)

		conn.commit()

		return jsonify({"sucesso": "Conversa deletada com sucesso!"})
	except Exception as e:
		print(e)
		return jsonify({"error": str(e)}), 500


def deletar_todas_conversas(usuario_id):
	try:
		conn = get_db_connection()
		cursor = conn.cursor()

		# usuario_id = get_jwt_identity()
		cursor.execute(
			"""
				DELETE
				FROM conversas
				WHERE usuario_id = %s;
			""",
			(usuario_id,)
		)


		conn.commit()

		return jsonify({"sucesso": "Conversas deletadas com sucesso!"})
	except Exception as e:
		return jsonify({"error": str(e)}), 500

def configurar_ia():
	data = request.get_json()
	required_fields = {
		'model': validate_text, 
		'max_tokens': validate_required, 
		'temperature': validate_required,
		'top_p': validate_required,
		'n': validate_required,
		'presence_penalty': validate_required,
		'frequency_penalty': validate_required,
		'instructions': validate_text
	}

	is_valid, errors = validate_params(data, required_fields)
	if not is_valid:
		return jsonify({"error": str(errors)}), 400
	
	try:
		conn = get_db_connection()
		cursor = conn.cursor()
		cursor.execute(""" 
			UPDATE configuracao_ia
			SET 
				model = %s, max_tokens = %s, 
				temperature = %s, top_p = %s, 
				n = %s, presence_penalty = %s, 
				frequency_penalty = %s, instructions = %s
			WHERE id = 1;
		""", (
			data['model'], 
			data['max_tokens'], 
			data['temperature'],
			data['top_p'],
			data['n'],
			data['presence_penalty'],
			data['frequency_penalty'],
			data['instructions']
		))

		conn.commit()

		return jsonify({"sucesso": 'Configurações salvas com sucesso!'})

	except Exception as e:
		print(e)
		return jsonify({"error": str(e)}), 500
	
def mostrar_configuracoes_ia():
	try:
		conn = get_db_connection()
		cursor = conn.cursor()
		insert_query = cursor.execute(""" 
			SELECT * FROM configuracao_ia where id = 1;
		""")

		insert_query = cursor.fetchone()

		configuracoes = {
			"model": insert_query[1], 
			"max_tokens": insert_query[2], 
			"top_p": insert_query[3],
			"temperature": insert_query[4], 
			"instructions": insert_query[5], 
			"n": insert_query[6], 
			"presence_penalty": insert_query[7], 
			"frequency_penalty": insert_query[8],
			"data_modificacao": insert_query[9],
		}

		return jsonify(configuracoes=configuracoes)

	except Exception as e:
		print(e)
		return jsonify({"error": str(e)}), 500