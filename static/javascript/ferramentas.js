/**
 * Cria um elemento na DOM a partir do nome do elemento e suas propriedades
 * 
 * @param {string} nome - O nome do elemento a ser criado (e.g., 'div', 'span').
 * @param {Object} opcoes - Um objeto com as propriedades deste elemento que serão criadas.
 * @param {string} [opcoes.className] - A classe do elemento.
 * @param {string} [opcoes.type] - O tipo do elemento (caso ele possua).
 * @returns {HTMLElement} O novo elemento criado
 */


function criarElemento(nome, opcoes) {
    const element = document.createElement(nome);
	// para cada chave em opções, ele vai atribuir ao atributo de mesmo nome no elemento
	// o valor da opção
	Object.keys(opcoes).forEach(opcao =>  element[opcao] = opcoes[opcao]);
    return element;
}