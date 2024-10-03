
// Função para adicionar cor no icon clicado
var menuItem = document.querySelectorAll('.item-menu');

function selectLink() {
    menuItem.forEach((item) =>
        item.classList.remove('active')
    )
    this.classList.add('active');
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