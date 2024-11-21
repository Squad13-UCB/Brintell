from flask import Blueprint, send_from_directory
from services.login import login
from services.openai import ask_openai, configurar_ia, mostrar_configuracoes_ia, mostrar_conversas, mostrar_conversa, deletar_conversa, deletar_todas_conversas
from services.cliente import cadastrar_cliente, update_feedback, create_feedback, mostrar_feedback
from services.admin import cadastrar_admin, atualizar_admin, atualizar_senha, mostrar_admins, mostrar_chamados, atualizar_chamado

main = Blueprint('main', __name__)

# @jwt_required()
@main.route('/ask', methods=['POST'])
def ask():
	return ask_openai()

@main.route('/configuracoes-ia', methods=['GET'])
def mostrar_config_ia():
	return mostrar_configuracoes_ia()

@main.route('/configurar-ia', methods=['POST'])
def config_ia():
	return configurar_ia()

# @jwt_required()
@main.route('/conversas/<int:usuario_id>', methods=['GET'])
def mostrar_conversas_ia(usuario_id):
	return mostrar_conversas(usuario_id)

# @jwt_required()
@main.route('/conversa/<int:conversa_id>', methods=['GET'])
def mostrar_conversa_ia(conversa_id):
	return mostrar_conversa(conversa_id)

# @jwt_required()
@main.route('/conversa/<int:conversa_id>', methods=['DELETE'])
def deletar_conversa_ia(conversa_id):
	return deletar_conversa(conversa_id)

# @jwt_required()
@main.route('/conversas/<int:usuario_id>', methods=['DELETE'])
def deletar_todas_conversas_ia(usuario_id):
	return deletar_todas_conversas(usuario_id)

@main.route('/login', methods=['POST'])
def login_route():
	return login()

@main.route('/cadastrar-cliente', methods=['POST'])
def cadastrar_cliente_route():
	return cadastrar_cliente()

@main.route('/cadastrar-admin', methods=['POST'])
def cadastrar_admin_route():
	return cadastrar_admin()

@main.route('/admin', methods=['GET'])
def mostrar_admins_route():
	return mostrar_admins()

@main.route('/admin', methods=['PUT'])
def atualizar_admin_route():
	return atualizar_admin()

@main.route('/admin/senha', methods=['PUT'])
def atualizar_senha_admin_route():
	return atualizar_senha()

@main.route('/create-feedback', methods=['POST'])
def create_feedback_route():
	return create_feedback()

@main.route('/update-feedback', methods=['POST'])
def update_feedback_route():
	return update_feedback()

@main.route('/get-feedback/<int:cliente_id>', methods=['GET'])
def mostrar_feedback_route(cliente_id):
	return mostrar_feedback(cliente_id)

@main.route('/mostrar-chamados', methods=['GET'])
def mostrar_chamados_route():
	return mostrar_chamados()

@main.route('/atualizar-chamado', methods=['PUT'])
def atualizar_chamados_route():
	return atualizar_chamado()

@main.route('/')
def index_html():
	return send_from_directory('../templates', 'chat-bot.html')

@main.route('/chat-bot')
def chat_bot():
	return send_from_directory('../templates', 'chat-bot.html')

@main.route('/cadastro-cliente')
def cadastro_cliente_html():
	return send_from_directory('../templates', 'cadastro-cliente.html')

@main.route('/cadastro-admin')
def cadastro_admin_html():
	return send_from_directory('../templates', 'cadastro-admin.html')

@main.route('/login')
def login_html():
	return send_from_directory('../templates', 'login.html')

@main.route('/help')
def help_html():
	return send_from_directory('../templates', 'help.html')

@main.route('/feedback')
def feedback_html():
	return send_from_directory('../templates', 'feedback.html')

@main.route('/chamados')
def camados_html():
	return send_from_directory('../templates', 'chamados.html')

@main.route('/perfil-cliente')
def perfil_cliente_html():
	return send_from_directory('../templates', 'perfil-cliente.html')

@main.route('/perfil-admin')
def perfil_admin_html():
	return send_from_directory('../templates', 'perfil-admin.html')
