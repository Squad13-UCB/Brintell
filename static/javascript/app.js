
prepararEnvioDasPerguntas()
configurarUltimasConversas()

const conversaAtual = localStorage.getItem('conversaAtual')

if (!isNaN(conversaAtual)) carregarChat(conversaAtual)

async function prepararEnvioDasPerguntas() {
	document.getElementById('send-btn').addEventListener('click', enviarPergunta);
	document.getElementById('user-input').addEventListener('keydown', (e) => {
		if (e.key === 'Enter') enviarPergunta()
	});
}

async function enviarPergunta() {	
	document.getElementById('user-input').setAttribute('placeholder', 'Pensando...')
	document.getElementById('user-input').setAttribute('disabled', true)
	document.getElementById('send-btn').setAttribute('disabled', true)

	let userInput = document.getElementById('user-input').value;
	if (userInput.trim() === '') {
		alert("Por favor, insira uma pergunta.");
		return;
	}

	addChatMessage('Você', userInput);

	document.getElementById('user-input').value = ''; // Limpa o campo de entrada

	const conversaAtual = localStorage.getItem('conversaAtual')

	const body = {pergunta: userInput, usuario_id: usuario.id, cliente_id: usuario.cliente_id}

	if (!isNaN(conversaAtual)) body.conversa_id = localStorage.getItem('conversaAtual')

	try {
		// Enviar pergunta ao backend
		const response = await fetch(`/ask`, {
			method: 'POST',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization':  `Bearer ${usuario.accessToken}`
			},
			body: JSON.stringify(body)
		})

		const data = await response.json()
	
		if (data.error) addChatMessage('Erro', data.error);
		else {
			const {resposta, conversa_id} = data.sucesso
			addChatMessage('IA', resposta);
			localStorage.setItem('conversaAtual', conversa_id)
	
			// adiciona a conversa ao histórico, se não já estiver salva
			if (!historicoJaEstaSalvo(conversa_id)) appendConversaToHistory(conversa_id, userInput)
		}
	} catch (error) {
		addChatMessage('Erro', 'Algo deu errado: ' + error.message)
	} finally {
		document.getElementById('send-btn').removeAttribute('disabled')
		document.getElementById('user-input').removeAttribute('disabled')
		document.getElementById('user-input').setAttribute('placeholder', 'Faça uma pergunta')
	}
}

// verifica se a conversa já foi salva no histórico
function historicoJaEstaSalvo (conversaId) {
	return !!document.getElementById(`history-item-${conversaId}`)
}

// Função para adicionar mensagens ao chat
function addChatMessage(sender, message, customClass) {
    let chatLog = document.getElementById('chat-log');
    let div = document.createElement('div');
	div.classList.add(`${sender === 'Você' ? 'user-message' : 'ia-message'}`, 'chat-message', customClass)

    let newMessage = document.createElement('p');
    newMessage.innerHTML = `${message}`;
    div.appendChild(newMessage)
	chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight; // Auto-scroll para a última mensagem
}

async function configurarUltimasConversas () {
	let conversas = (await getConversas()); // pega os 5 primeiros
	console.log({conversas});
	
	if (conversas.length == 0) {
		localStorage.removeItem('conversaAtual');
		limparChat()
	}
	conversas.forEach(({interacoes, id}) => appendConversaToHistory(id, interacoes[0].pergunta))
}

function appendConversaToHistory(conversaId, pergunta) {	
	if (pergunta.length > 13) pergunta = pergunta.substring(0, 13)

	document.getElementById('history-log').insertAdjacentHTML('afterbegin', `
		<div class='history-item-wrapper' id='history-item-${conversaId}' onclick='carregarChat(${conversaId})' >
			<div class='history-item'>
				<span class="txt">${pergunta}...</span>
				<span class='trash' onclick='excluirConversa(${conversaId})'><i class="bi bi-trash"></i></span>
			<div/>
		</div>
	`)
}

async function getConversas() {
	try {
		const accessToken = localStorage.getItem('accessToken');

		const resposta = await fetch(`/conversas/${usuario.id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization':  `Bearer ${accessToken}`
			},
		});		
		
		let conversas = (await resposta.json()).sucesso

		return conversas;
	} catch (error) {			
		console.error(error);
	}
}

// carrega o log do chat com a conversa inserida
async function carregarChat(conversaId) {
	console.log({conversaId});
		
	localStorage.setItem('conversaAtual', conversaId)	
	const conversa = await getConversa(conversaId)
	
	limparChat()		
	conversa.interacoes.forEach(({pergunta, resposta}) => {
		if (pergunta) addChatMessage('Você', pergunta)
		if (resposta) addChatMessage('IA', resposta)
	})
}

async function getConversa(conversaId) {
	try {
		const accessToken = localStorage.getItem('accessToken');
		console.log({getconversa: conversaId});
		
		const resposta = await fetch(`/conversa/${conversaId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization':  `Bearer ${accessToken}`
			},
		});		
		
		let conversa = (await resposta.json()).sucesso

		return conversa;
	} catch (error) {			
		console.error(error);
	}
}

async function excluirConversa(conversaId) {		
	try {
		const accessToken = localStorage.getItem('accessToken');
		
		await fetch(`/conversa/${conversaId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization':  `Bearer ${accessToken}`
			},
		});		
		
		if (conversaId == localStorage.getItem('conversaAtual')) {
			localStorage.removeItem('conversaAtual')
			limparChat()
		}
		document.getElementById(`history-item-${conversaId}`).remove()
	} catch (error) {			
		console.error(error);
	}
}

async function excluirTudo() {
	try {
		const accessToken = localStorage.getItem('accessToken');
		
		const res = await fetch(`/conversas/${usuario.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization':  `Bearer ${accessToken}`
			},
		});		
		
		console.log(await res.json());
		

		document.querySelectorAll(`.history-item-wrapper`).forEach(item => item.remove())
		localStorage.removeItem('conversaAtual')
		limparChat()
	} catch (error) {			
		console.error(error);
	}
}

function abrirNovoChat() {
	localStorage.removeItem('conversaAtual');
	limparChat()
}

function limparChat() {
	// limpa o log
	document.getElementById('chat-log').innerHTML = '';
}