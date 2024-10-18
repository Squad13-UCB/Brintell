const active = localStorage.getItem('menuActive') == 'true';
const sidebarHTML = `
    <!-- Sidebar -->
    <nav id="menu" class="${active && 'active'}">
        <div id="top-menu">
            <div class="expandir">
                <i class="bi bi-list" id="btn-exp"></i>
            </div>
            <div class="bnss">
                <span class="icon">
                    <i class="bi bi-file-earmark-person"></i>
                </span>
                <span class="txt-link">Nome empresa</span>
            </div>
        </div>
        <ul class="siderbar">
            <div class="line"></div>
            <li id="profile" class="item-menu conta">
                <a href="profile-user.html">
                    <span class="icon">
                        <i class="bi bi-person"></i>
                    </span>
                    <span class="txt-link">Conta</span>
                </a>
            </li>
            <li id="chat-bot" class="item-menu chat">
                <a href="chat-bot.html" class="">
                    <span class="icon">
                        <i class="bi bi-robot"></i>
                    </span>
                    <span class="txt-link">Chat Bot</span>
                </a>
            </li>
            <li id="settings" class="item-menu config">
                <a href="settings-user.html">
                    <span class="icon">
                        <i class="bi bi-gear"></i>
                    </span>
                    <span class="txt-link">Configurações</span>
                </a>
            </li>
            <li id="help" class="item-menu ajuda">
                <a href="help.html">
                    <span class="icon">
                        <i class="bi bi-question-circle"></i>
                    </span>
                    <span class="txt-link">Ajuda</span>
                </a>
            </li>
            <div class="line"></div>
            <li class="item-menu logout">
                <a href="#">
                    <span class="icon">
                        <i class="bi-box-arrow-right"></i>
                    </span>
                    <span class="txt-link">Logout</span>
                </a>
            </li>
        </ul>
    </nav>
`;

function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('usuario');
    window.location.href = '/login';
}

// Insere o menu no container
const container = document.getElementById('container');
container.insertAdjacentHTML('afterbegin', sidebarHTML);

// Função para o abrir e fechar o menu lateral	
const btnExp = document.querySelector('#btn-exp')
const menuSide = document.querySelector('#menu')
btnExp.addEventListener('click', () => {
    menuSide.classList.toggle('active')
    localStorage.setItem('menuActive', !active);
})

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
})

// Função para o abrir e fechar o menu do chat-bot
var cbExp = document.querySelector('#btn-exp-cb')
var menuChat = document.querySelector('#chat-bot-container')

cbExp.addEventListener('click', function () {
    menuChat.classList.toggle('active')
})
