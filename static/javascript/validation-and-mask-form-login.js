import { validarEmail, validarSenha } from './validation-and-mask-form-cadastro-cliente.js';

const email = document.getElementById('email');
const senha = document.getElementById('senha');


// Validação email
email.addEventListener('focus', () => {
    email.style.border = "2px solid rgba(34, 116, 164)";
    email.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";
})

email.addEventListener('blur', () => {
    const isValid = validarEmail(email);
    if (isValid) {
        email.style.border = "";
        email.style.boxShadow = "";
    }
})

email.addEventListener('input', () => {
    email.style.border = "2px solid rgba(34, 116, 164)";
    email.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";

    validarEmail(email)
})


// Validação senha
senha.addEventListener('focus', () => {
    senha.style.border = "2px solid rgba(34, 116, 164)";
    senha.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";
})

senha.addEventListener('blur', () => {
    const isValid = validarSenha(senha)

    if (isValid) {
        email.style.border = "";
        email.style.boxShadow = "";
    }
})

senha.addEventListener('input', () => {
    senha.style.border = "2px solid rgba(34, 116, 164)";
    senha.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";

    validarSenha(senha)
})
