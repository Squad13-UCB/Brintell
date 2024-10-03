

// Função para adicionar cor no icon clicado
var menuItem = document.querySelectorAll('.item-menu');

function selectLink() {
    menuItem.forEach((item) =>
        item.classList.remove('active')
    )
    this.classList.add('active');

    // Armazenar o ID do item
    localStorage.setItem('activeMenuItem', this.id);
}

menuItem.forEach((item) =>
    item.addEventListener('click', selectLink)
)

// Função para o abrir e fechar o menu
var btnExp = document.querySelector('#btn-exp')
var menuSide = document.querySelector('#menu')

btnExp.addEventListener('click', function() {
    menuSide.classList.toggle('active')
})

// Consulta o ID armazena pra colocar cor no opção escolhida
window.addEventListener('DOMContentLoaded', (event) => {
    const activeItemId = localStorage.getItem('activeMenuItem');
    if (activeItemId) {
        const activeItem = document.getElementById(activeItemId);
        if (activeItem) {
            activeItem.classList.add('active')
        }
    }
})

document.getElementById('send-btn').addEventListener('click', function() {
    let userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') {
        alert("Por favor, insira uma pergunta.");
        return;
    }

    addChatMessage('Você', userInput);

    // Enviar pergunta ao backend
    fetch('/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userInput })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            addChatMessage('Erro', data.error);
        } else {
            addChatMessage('IA', data.response);
        }
    })
    .catch(error => addChatMessage('Erro', 'Algo deu errado: ' + error.message));

    document.getElementById('user-input').value = ''; // Limpa o campo de entrada
});

// Função para adicionar mensagens ao chat
function addChatMessage(sender, message) {
    let chatLog = document.getElementById('chat-log');
    let newMessage = document.createElement('p');
    newMessage.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatLog.appendChild(newMessage);
    chatLog.scrollTop = chatLog.scrollHeight; // Auto-scroll para a última mensagem
}
