import re

def validate_params(data, required_fields):
	"""
		Valida os parâmetros recebidos para garantir que todos os campos obrigatórios
		estejam presentes e validem as condições específicas (ex: formato de email).

		Args:
		data (dict): Dicionário contendo os dados a serem validados.
		required_fields (dict): Dicionário contendo os campos obrigatórios e as funções de validação.

		Returns:
		tuple: (bool, dict) Retorna um booleano indicando se a validação foi bem-sucedida
		e um dicionário com as mensagens de erro.
	"""
	errors = {}
	is_valid = True
	# Verifica se required_fields não é None e é um dicionário
	for field, validation_fn in required_fields.items():
		value = data.get(field)
		if not value:
			errors[field] = f"{field} é obrigatório."
			is_valid = False

		elif validation_fn and not validation_fn(value):
			errors[field] = f"{field} é inválido."
			is_valid = False
	return is_valid, errors

# Funções de validação específicas
def validate_email(email):
    # Expressão regular simples para validar o formato do email
    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(email_regex, email) is not None

def validate_password(password):
    # Validação simples para garantir um mínimo de 8 caracteres
    return len(password) >= 8

def validate_required(param):
    # Validação vazia
    return True

def validate_text(nome):
    # Validação simples para garantir que o nome tenha pelo menos 2 caracteres
    return len(nome) >= 2

