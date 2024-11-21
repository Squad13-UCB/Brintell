from psycopg2 import sql

def abrir_chamado(cursor, conn, cliente_id, descricao, data):
	try:
		# Verifica se já tem chamados abertos
		select_chamado_query = sql.SQL("""SELECT status, data FROM chamados WHERE chamados.cliente_id = %s;""")

		cursor.execute(select_chamado_query, (cliente_id,))

		select_chamado_query_result = cursor.fetchone()
		if select_chamado_query_result != None and (select_chamado_query_result[0] == 'aberto' or select_chamado_query_result[0] == 'em transito'):
			return "Você já tem um chamado aberto. Peço que aguarde o técnico na data: " + select_chamado_query_result[1]
		
		select_query = sql.SQL("""
			SELECT usuarios.nome, enderecos.id
			FROM clientes
			JOIN enderecos ON clientes.endereco_id = enderecos.id
			JOIN usuarios ON usuarios.id = clientes.id
			WHERE clientes.id = %s;		        
		""")

		cursor.execute(select_query, (cliente_id,))

		select_query_result = cursor.fetchone()

		insert_query = sql.SQL("""             
			INSERT INTO chamados (nome, descricao, cliente_id, endereco_id, data, status)
			VALUES (%s, %s, %s, %s, %s, 'aberto')
		""")
		
		cursor.execute(insert_query, (select_query_result[0], descricao, cliente_id, select_query_result[1], data))

		conn.commit()

		return "O seu chamado foi aberto. Por aqui você também pode verificar o status do chamado. Obrigada pela compreensão!"

	except Exception as e:
		print(e)
		return "Houve um erro inesperado. Peço que tente novamente, desculpe!"
	
def reagendar_chamado(cursor, conn, cliente_id, data):
	try:
		# Atualiza somente chamados abertos
		update_query = sql.SQL("""
			UPDATE chamados
			SET data = %s 
			WHERE chamados.cliente_id = %s AND chamados.status = 'aberto';
		""")

		print("data: ", data)

		cursor.execute(update_query, (data, cliente_id,))
		conn.commit()

		return "Tudo certo, atualizei aqui o seu chamado!"

	except Exception as e:
		print(e)
		return "Houve um erro inesperado. Peço que tente novamente, desculpe!"
	
def cancelar_chamado(cursor, conn, cliente_id):
	try:
		# Atualiza somente chamados abertos
		update_query = sql.SQL("""
			UPDATE chamados
			SET status = 'cancelado' 
			WHERE chamados.cliente_id = %s;
		""")

		cursor.execute(update_query, (cliente_id,))
		
		conn.commit()

		return "Tudo certo, já cancelei aqui o seu chamado!"

	except Exception as e:
		print(e)
		return "Houve um erro inesperado. Peço que tente novamente, desculpe!"
	
def mostrar_chamado(cursor, conn, cliente_id):
	try:
		# Atualiza somente chamados abertos
		select_query = sql.SQL("""
			SELECT status, data, u.nome FROM chamados c
			LEFT JOIN usuarios u ON u.id = c.usuario_id
			WHERE c.status = 'aberto' OR c.status = 'em transito' AND c.cliente_id=%s;
		""")

		cursor.execute(select_query, (cliente_id,))
		result = cursor.fetchone()

		print(cliente_id)
		print(result)
		
		if result != None:
			tecnico = "O técnico {} irá te atender".format(result[2]) if result[2] != None else " Estamos aguardando um técnico responder o chamado. Peço que aguarde um pouco, obrigada pela compreensão!"
			return "Você tem um chamado {} para o dia {}. {}".format(result[0], result[1], tecnico)
		else:
			return "Você não tem chamados abertos ou em trânsito."

	except Exception as e:
		print(e)
		return "Houve um erro inesperado. Peço que tente novamente, desculpe!"
	
def mostrar_meu_plano(cursor, cliente_id):
	try:
		cursor.execute("""
				SELECT p.nome
				FROM clientes c
				JOIN planos p ON p.id = c.plano_id
				WHERE c.id = %s;
			""", (cliente_id,))
		plano = cursor.fetchone()

		if plano != None:
			return "O seu plano é de {}".format(plano[0])
		else:
			return "Você não tem nenhum plano de internet. Que tal aproveitar o momento para contratar agora?"
	
	except Exception as e:
		print(e)
		return "Houve um erro inesperado. Peço que tente novamente, desculpe!"

def mostrar_planos(cursor):
	try:
		cursor.execute("SELECT * FROM planos;")
		planos = cursor.fetchall()
		resposta = "Temos estes planos disponíveis: "
		for i, plano in enumerate(planos):
			resposta += plano[1] # adiciona o nome do plano na resposta
			if i <= len(plano): resposta += ", "
		return resposta
	except Exception as e:
		print(e)
		return "Houve um erro inesperado. Peço que tente novamente, desculpe!"

def cadastrar_plano(cursor, conn, cliente_id, plano, enviar_mensagem):
	try:
		cursor.execute("SELECT * FROM planos;")
		planos = cursor.fetchall()

		planos_organizados = ""
		for plano in planos:
			planos_organizados += "plano -> id: {}; label: {}\n".format(plano[0], plano[1])
		
		mensagens = [{
			"role": "system", 
			"content": 
				"O usuário quer o plano de {}. Estes são os planos disponíveis: {}. Selecione o id correto a partir do plano solicitado e retorne apenas o id"
				.format(plano, planos_organizados)
		}]
		print(mensagens)
		response = enviar_mensagem(mensagens, cursor)
		plano_id = response.choices[0].message.content

		print(cliente_id, plano, plano_id)

		cursor.execute("UPDATE clientes SET plano_id=%s WHERE id=%s;", 
			(plano_id, cliente_id,)
		)
		conn.commit()
		return "Ótima escolha! Atualizei aqui o seu plano de internet. Obrigada pela preferência!"
	
	except Exception as e:
		print(e)
		return "Houve um erro inesperado. Peço que tente novamente, desculpe!"