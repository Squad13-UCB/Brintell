
carregarChamados()
async function carregarChamados() {

	const resposta = await fetch(`/mostrar-chamados`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization':  `Bearer ${usuario.accessToken}`
		},
	});		
	
	const chamados = (await resposta.json()).sucesso
	console.log({chamados});
	
	const chamadosTable =  document.getElementById('chamados')
	chamados.forEach(({id, nome, descricao, status, data, endereco, tecnico}) => {
		let botaoLabel;
		let statusParaAtualizar;

		switch (status) {
			case 'aberto':
				botaoLabel = 'Atender'
				statusParaAtualizar = 'em transito'
				break;
			case 'em transito':
				botaoLabel = 'Finalizar'
				statusParaAtualizar = 'finalizado'
				break;
		
			default:
				break;
		}
		console.log({statusParaAtualizar});
		
		chamadosTable.insertAdjacentHTML('beforeend', `
		<tr>
			<td>${id}</td>
			<td>${nome}</td>
			<td>${descricao}</td>
			<td>${status}</td>
			<td>${data}</td>
			<td>${endereco}</td>
			<td>${tecnico || 'Chamado ainda não atendido'}</td>
			<td>
				${(status != 'cancelado' && status != 'finalizado') ? `
					<button onclick="atualizarChamado(${id}, '${statusParaAtualizar}')">
					${botaoLabel}
					</button>
				` : ''}
			</td>
			
		</tr>	
		`)
	})
}

async function atualizarChamado(id, status) {	
	const resposta = await fetch(`/atualizar-chamado`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization':  `Bearer ${usuario.accessToken}`
		},
		body: JSON.stringify({
			usuario_id: usuario.id,
			chamado_id: id,
			status
		})
	});

	const sucesso = (await resposta.json()).sucesso
	
	if (sucesso) location.reload()	
}