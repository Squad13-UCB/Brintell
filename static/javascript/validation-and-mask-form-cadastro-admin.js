import { validators } from './validation-and-mask-form-cadastro-cliente.js';

const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');

// Validação nome
nome.addEventListener('focus', () => {
    nome.style.border = "2px solid rgba(34, 116, 164)";
    nome.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";
})

nome.addEventListener('blur', () => {
    const isValid = validators.validarNomeUser(nome)

    if (isValid) {
        nome.style.border = "";
        nome.style.boxShadow = "";
    }
})

nome.addEventListener('input', () => {
    nome.style.border = "2px solid rgba(34, 116, 164)";
    nome.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";

    validators.validarNomeUser(nome)
})


// Validação email
email.addEventListener('focus', () => {
    email.style.border = "2px solid rgba(34, 116, 164)";
    email.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";
})

email.addEventListener('blur', () => {
    const isValid = validators.validarEmail(email);
    if (isValid) {
        email.style.border = "";
        email.style.boxShadow = "";
    }
})

email.addEventListener('input', () => {
    email.style.border = "2px solid rgba(34, 116, 164)";
    email.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";

    validators.validarEmail(email)
})


// Validação senha
senha.addEventListener('focus', () => {
    senha.style.border = "2px solid rgba(34, 116, 164)";
    senha.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";
})

senha.addEventListener('blur', () => {
    const isValid = validators.validarSenha(senha)

    if (isValid) {
        email.style.border = "";
        email.style.boxShadow = "";
    }
})

senha.addEventListener('input', () => {
    senha.style.border = "2px solid rgba(34, 116, 164)";
    senha.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";

    validators.validarSenha(senha)
})
