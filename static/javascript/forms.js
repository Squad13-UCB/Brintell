/**
 * Cria um popUp na tela para notificar o usuário de alguma mensagem
 * @param {Object} notificacao - Um objeto com as propriedades da notificação.
 * @param {string} [notificacao.tipo] - O tipo da notificação (e.g., 'sucesso' ou 'erro').
 * @param {string} [notificacao.mensagem] - A mensagem que será mostrada ao usuário (e.g., 'Configurações Salvas!').
 * @param {string} [notificacao.idFormulario] -O id do formulário.
 */
function enviarNotificacao({tipo, mensagem, idFormulario}) {		
	document.getElementById(idFormulario).querySelector('#response-message')
		.innerHTML = `<span class="notificacao-form ${tipo}">${mensagem}</span>`;
}

/**
 * Envia a requisição do formulário indicado
 * @param {string} idFormulario - Id do formulário onde os atributos serão enviados na requisição.
 * @param {string} [rota] - A rota para enviar a requisição (e.g., '/login').
 * @param {function(...args): string} mensagemDeErro - Processa erro e retorna a mensagem que deve ser mostrada (e.g., 'Configurações Salvas!').
 * @param {function(...args): string} mensagemDeSucesso - Processa o sucesso e retorna a mensagem que deve ser mostrada (e.g., 'Configurações Salvas!').
 */
async function prepararRequisicao(idFormulario, rota, mensagemDeErro, mensagemDeSucesso, metodo) {
	const form = document.getElementById(idFormulario);
	console.log({form});
	
	form.addEventListener('submit', async function(event) {	
		event.preventDefault();  // Previne que o formulário envie a requisição
	
		// forma o corpo da requisição a partir dos parametros informados no argumento da função
		let body = {}
		
		for (const child of document.getElementById(idFormulario).querySelectorAll('input, select, textarea')) {
			// verifica o tipo do dado e converte para o tipo solicitado
			const dataType = child.getAttribute('data-type')
			let value = child.value;
			if (dataType === 'int') Number(value) 
			// const ehSenha = child.type == 'password';			
			Object.assign(body, {[child.id]: value})
		}
		console.log({body});
		console.log(`/${rota}`);
		
		let notificacao = {};
		try {

			const resposta = await fetch(`${rota}`, {
				method: metodo || 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

			if (resposta.status === 500) throw new Error("Erro interno!");

			const data = await resposta.json();
						
			if (data.error) notificacao = {tipo: 'erro', mensagem: mensagemDeErro(data.error), idFormulario}
			else notificacao = {tipo: 'sucesso', mensagem: mensagemDeSucesso(data.sucesso), idFormulario}

		} catch (error) {			
			console.error(error);
			notificacao = {tipo: 'erro', mensagem: 'Ocorreu um erro interno. Tente de novamente, por favor.', idFormulario};

		} finally {					
			enviarNotificacao(notificacao)
		}
	})
};

/**
 * Recebe um usuário e accessToken, armazena-os no localStorage e redireciona o usuário para a página principal
 * @param {Object} Usuario
 * @param {string} accessToken
 */
function salvarUsuarioEAccessTokenEredirecionar(usuario, accessToken) {
	// insere o token no armazenamento local e redireciona para a página inicial
	localStorage.setItem('usuario', JSON.stringify(usuario));
	localStorage.setItem('accessToken', accessToken);	
	window.location.href = '/'
}

/**
 * Carrega os valores de um formulário a partir de sua rota na api
 * @param {string} idFormulario - Id do formulário onde os atributos serão carregados.
 * @param {string} rota - O endpoint a partir do qual os dados serão carregados (e.g., '/configuracoes-ia').
 * @param {string} item - O item que será extraído da resposta da requisição (e.g., 'configuracoes')
 * @param {Array.string} retornarParametros - Um array de strings que indica os parametros que devem ser retornados ao fim da chamada.
 * @returns {Array.string}
*/
async function carregarFormulario(rota, item, retornarParametros) {
	try {
		const resposta = await fetch(`${rota}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		});
		
		const data = await resposta.json()
		
		// extrai o item retornado pela api a partir do rótulo indicado pelo usuário
		// e retorna as chaves deste item
		const parametros = data[item]
		const parametrosKeys = Object.keys(data[item])
		
		const parametrosParaRetornar = {}
		
		parametrosKeys.forEach(parametroKey => {			
			const parametroValue = parametros[parametroKey]
			// se o parametro atual for solicitado na chamada da função,
			// ele é adicionado no objeto de parametros a serem retornados
			
			if (retornarParametros.includes(parametroKey))
				Object.assign(parametrosParaRetornar, {[parametroKey]: parametroValue})
	
			// caso contrário, seu valor é adicionado ao seu respectivo campo no form
			else document.getElementById(parametroKey).value = parametros[parametroKey] 
		})
	
		return parametrosParaRetornar;
	} catch (error) {
		console.error(error);
		enviarNotificacao({tipo: 'erro', mensagem: 'Houve um erro ao carregar as informações. Atualize a página e tente novamente'})
	}
}