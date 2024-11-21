// Resetar os input
window.onload = function() {
    const form = document.getElementsByTagName('form')[0];
    form.reset();
}

// Função para o abrir e fechar o menu lateral	
const btnExp = document.querySelector('#btn-exp');
const menuSide = document.querySelector('#menu');
const content = document.querySelector('#content')
btnExp.addEventListener('click', () => {
	menuSide.classList.toggle('active')
	localStorage.setItem('menuActive', !active);

	content.classList.toggle('active')
	localStorage.setItem('contentActive', !active);
})

// Função para o abrir e fechar o menu lateral do chat-bot
document.addEventListener('DOMContentLoaded', () => {
    const cbExp = document.querySelector('#btn-exp-cb');
    const menuChat = document.querySelector('#chat-bot-container');

    cbExp.addEventListener('click', function() {
        menuChat.classList.toggle('active');
    });
});


// Função para adicionar cor no icon clicado
const menuItem = document.querySelectorAll('.item-menu');

function selectLink() {
    menuItem.forEach((item) =>
        item.classList.remove('active') 
    )
    this.classList.add('active');

    // Armazenar o ID do item
    localStorage.setItem('activeMenuItem', this.id);
}

menuItem.forEach((item) => item.addEventListener('click', selectLink))

window.addEventListener('DOMContentLoaded', (event) => {
    const activeItemId = localStorage.getItem('activeMenuItem');
    if (activeItemId) {
        const activeItem = document.getElementById(activeItemId);
        if (activeItem) {
            activeItem.classList.add('active')
        }
    }

    // Desativar menu lateral quando mudar de página
    if (localStorage.getItem('menuActive') === 'true') {
        menuSide.classList.remove('active');
        content.classList.remove('active');
    }
})

// Função para abrir e fechar o Popup
const modal = document.querySelector("#admin-popup");
const enter = document.querySelector("#enter-popup");
const exit = document.querySelector("#exit-popup");

enter.addEventListener("click", function () {
    modal.showModal();
});

exit.addEventListener("click", function () {
    modal.close();
});