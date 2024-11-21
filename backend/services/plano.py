from flask import jsonify, request
from db import get_db_connection

def mostrar_planos(cliente_id):
	try:
		conn = get_db_connection()

		cursor = conn.cursor()

		query = """
		SELECT nome FROM planos WHERE cliente_id = %s;
		"""

		cursor.execute(query, (cliente_id,))

		select_result = cursor.fetchone()
		
		plano = {
			"usuario_id": select_result[0],
		}

		cursor.close()
		conn.close()

		return jsonify({"sucesso": {"plano": plano}})

	except Exception as e:
		print(e)
		return jsonify({"error": str(e)}), 500

def contratar_plano(plano_id, cliente_id):
	try:
		conn = get_db_connection()

		cursor = conn.cursor()

		query = """
			UPDATE clientes SET plano_id = %s WHERE id = %s;
		"""

		cursor.execute(query, (plano_id, cliente_id,))

		cursor.close()
		conn.commit()
		conn.close()

		return jsonify({"sucesso": "Plano atualizado com sucesso"})

	except Exception as e:
		print(e)
		return jsonify({"error": str(e)}), 500