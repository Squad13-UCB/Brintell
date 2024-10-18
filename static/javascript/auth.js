async function enviarRequisicao(idFormulario, rota, parametros, lidarComErros, lidarComSucesso) {
	console.log("enviando requisição");
	
	document.getElementById(idFormulario)?.addEventListener('submit', async function(event) {	
		event.preventDefault();  // Previne que o formulário envie a requisição
	
		// forma o corpo da requisição a partir dos parametros informados no argumento da função
		const body = parametros.reduce((acc, parametro) => {
			acc[parametro] = document.getElementById(parametro).value;
			return acc;
		}, {});

		// Envia a requisição para a API
		let responseMessage = '';
		try {
			const resposta = await fetch(`http://localhost:5000/${rota}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

			const data = await resposta.json();
			
			if (data.error) responseMessage = lidarComErros(data.error)
			else lidarComSucesso(data)

		} catch (error) {			
			console.error( error);
			responseMessage = 'Ocorreu um erro interno. Tente de novamente, por favor.';

		} finally {
			document.getElementById('response-message').innerHTML = `<span class="error">${responseMessage}</span>`;
		}
	})
};

function salvarUsuarioEAccessTokenEredirecionar(usuario, accessToken) {
	// insere o token no armazenamento local e redireciona para a página inicial
	localStorage.setItem('usuario', JSON.stringify(usuario));
	localStorage.setItem('accessToken', accessToken);
	window.location.href = '/'
}

enviarRequisicao('login-form', '/login', ['email', 'senha'], 
	(error) => error, 
	({usuario, accessToken}) => salvarUsuarioEAccessTokenEredirecionar(usuario, accessToken)
);

enviarRequisicao('cadastro-form', '/cadastrar', ['email', 'senha', 'nome'], 
	(error) => (error.includes('duplicate') && error.includes('email')) && 'Este email já foi cadastrado', 
	({usuario, accessToken}) => salvarUsuarioEAccessTokenEredirecionar(usuario, accessToken)
);