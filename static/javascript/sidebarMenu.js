let usuario = localStorage.getItem('usuario')

// Redireciona para o página de login se não estiver logado
if (usuario == 'undefined' | usuario == null) window.location.href = '/login'
else usuario = JSON.parse(usuario)

const menusAdmin = `
	<li id="profile" class="item-menu conta">
		<a href=/perfil-admin>
			<span class="icon">
				<i class="bi bi-person"></i>
			</span>
			<span class="txt-link">Conta</span>
		</a>
	</li>
	<li id="profile" class="item-menu conta">
		<a href=/chamados>
			<span class="icon">
				<i class="bi bi-megaphone"></i>
			</span>
			<span class="txt-link">Chamados</span>
		</a>
	</li>
`

const menusCliente = `
	<li id="chat-bot" class="item-menu chat">
		<a href="/chat-bot">
			<span class="icon">
				<i class="bi bi-robot"></i>
			</span>
			<span class="txt-link">Chat Bot</span>
		</a>
	</li>
	<li id="feedback" class="item-menu feedback">
		<a href="/feedback">
			<span class="icon">
				<i class="bi bi-star-fill"></i>
			</span>
			<span class="txt-link">Feedback</span>
		</a>
	</li>
	<li id="help" class="item-menu help">
		<a href="/help">
			<span class="icon">
				<i class="bi bi-question-circle"></i>
			</span>
			<span class="txt-link">Ajuda</span>
		</a>
	</li>
`

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
                <span class="txt-link">Olá, ${usuario.nome.split(' ')[0]}</span>
            </div>
        </div>
        <ul class="siderbar">
            <div class="line"></div>
				${usuario.tipo_conta == 'a' ? menusAdmin : menusCliente}
            <div class="line"></div>
            <li class="item-menu logout">
                <a onclick="logout()" href="#" id="logout">
                    <span class="icon">
                        <i class="bi bi-box-arrow-right"></i>
                    </span>
                    <span class="txt-link">Logout</span>
                </a>
            </li>
        </ul>
    </nav>
`;

const rotasProtegidas = {
	'/perfil-admin': {
		perfisAutorizados: ['a'],
		redirecionar: '/perfil-cliente'
	},
	'/perfil-cliente': {
		perfisAutorizados: ['c'],
		redirecionar: '/perfil-admin'
	},
	'/feedback': {
		perfisAutorizados: ['c'],
		redirecionar: '/perfil-admin'
	},
	'/': {
		perfisAutorizados: ['c'],
		redirecionar: '/perfil-admin'
	},
	'/admin': {
		perfisAutorizados: ['c'],
		redirecionar: '/perfil-admin'
	},
	'/chamados': {
		perfisAutorizados: ['a'],
		redirecionar: '/'
	}
}

// Verifica rotas protegidas
window.location.pathname
const rota = rotasProtegidas[window.location.pathname];
if (rota && !rota.perfisAutorizados.includes(usuario.tipo_conta)) window.location.replace(rota.redirecionar);

function logout () {
	localStorage.removeItem('accessToken');
	localStorage.removeItem('usuario');
	window.location.href = '/login';
}

// Insere o menu no container
const container = document.getElementById('container');	
container.insertAdjacentHTML('afterbegin', sidebarHTML);	
