const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const cpf = document.getElementById('cpf');
const telefone = document.getElementById('telefone');
const cep = document.getElementById('cep');
const logradouro = document.getElementById('logradouro');
const numero = document.getElementById('numero');


// Validação email
export function validarEmail(email) {
    const regexEmail = /^(?![^\s@]{0,3}@)[^\s]+@[^\s]+\.[^\s]+$/;

    if(!regexEmail.test(email.value)) {
        email.style.border = "2px solid red";
        email.style.boxShadow = "0 0 5px 5px rgba(255, 0, 0, 0.3)";
        
        return false;
    } else {
        email.style.border = "2px solid rgba(34, 116, 164)";
        email.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";
         
        return true;
    }
}

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
// Fim da validação email


// Validação senha
export function validarSenha(senha) {
    const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    if(!regexSenha.test(senha.value)) {
        senha.style.border = "2px solid red";
        senha.style.boxShadow = "0 0 5px 5px rgba(255, 0, 0, 0.3)";
        
        return false;
    } else {
        senha.style.border = "2px solid rgba(34, 116, 164)";
        senha.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";
         
        return true;
    }
}

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
// Fim da validação senha


// Validação nome
export function validarNomeUser(nome) {
    let nometam = nome.value.length;

    if(nometam <= 2) {
        nome.style.border = "2px solid red";
        nome.style.boxShadow = "0 0 5px 5px rgba(255, 0, 0, 0.3)";
        
        return false;
    } else {
        nome.style.border = "2px solid rgba(34, 116, 164)";
        nome.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";
         
        return true;
    }
}

nome.addEventListener('focus', () => {
    nome.style.border = "2px solid rgba(34, 116, 164)";
    nome.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";
})

nome.addEventListener('blur', () => {
    const isValid = validarNomeUser(nome)

    if (isValid) {
        nome.style.border = "";
        nome.style.boxShadow = "";
    }
})

nome.addEventListener('input', () => {
    nome.style.border = "2px solid rgba(34, 116, 164)";
    nome.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";

    validarNomeUser(nome)
})
// Fim da validação nome


// Validação cpf
export function validarCpf(cpf) {
    const cpfLimpo = cpf.replace(/\D/g, "");
    
    if (cpfLimpo.length == 11) {   
        return true;
    } 
    
    return false;

}

cpf.addEventListener('focus', () => {
    cpf.style.border = "2px solid rgba(34, 116, 164)";
    cpf.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";
})

cpf.addEventListener('blur', () => {
    const isValid = validarCpf(cpf.value)

    if (isValid) {
        cpf.style.border = "";
        cpf.style.boxShadow = "";
    } else {
        cpf.style.border = "2px solid red";
        cpf.style.boxShadow = "0 0 5px 5px rgba(255, 0, 0, 0.3)";
    }
})

cpf.addEventListener('input', () => {
    cpf.style.border = "2px solid rgba(34, 116, 164)";
    cpf.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";

    let cpfLimpo = cpf.value.replace(/\D/g, "");
    
    if (cpfLimpo.length > 3) {
        cpfLimpo = cpfLimpo.slice(0, 3) + '.' +  cpfLimpo.slice(3);
    } 
    if (cpfLimpo.length > 7) {
        cpfLimpo = cpfLimpo.slice(0, 7) + '.' +  cpfLimpo.slice(7);
    }
    if (cpfLimpo.length > 11) {
        cpfLimpo = cpfLimpo.slice(0, 11) + '-' +  cpfLimpo.slice(11);
    }

    cpf.value = cpfLimpo;

    const isValid = validarCpf(cpf.value)

    if(!isValid) {
        cpf.style.border = "2px solid red";
        cpf.style.boxShadow = "0 0 5px 5px rgba(255, 0, 0, 0.3)";
    } else {
        cpf.style.border = "2px solid rgba(34, 116, 164)";
        cpf.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";
    }
})
// Fim da validação cpf


// Validação telefone
export function validarTelefone(telefone) {
    const telefoneLimpo = telefone.replace(/\D/g, "");

    if(telefoneLimpo.length === 12) { 
        return true;
    }     
    
    return false;
}

telefone.addEventListener('focus', () => {
    telefone.style.border = "2px solid rgba(34, 116, 164)";
    telefone.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";
})

telefone.addEventListener('blur', () => {
    const isValid = validarTelefone(telefone.value)

    if (isValid) {
        telefone.style.border = "";
        telefone.style.boxShadow = "";
    } else {
        telefone.style.border = "2px solid red";
        telefone.style.boxShadow = "0 0 5px 5px rgba(255, 0, 0, 0.3)";
    }
})

telefone.addEventListener('input', () => {
    telefone.style.border = "2px solid rgba(34, 116, 164)";
    telefone.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";

    let telefoneValue = telefone.value.replace(/\D/g, "");

    if (telefoneValue.length <= 3) {
        telefone.value = `(${telefoneValue}`;
    } else if (telefoneValue.length <= 4) {
        telefone.value = `(${telefoneValue.slice(0, 3)}) ${telefoneValue.slice(3, 4)}`;
    } else if (telefoneValue.length <= 8) {
        telefone.value = `(${telefoneValue.slice(0, 3)}) ${telefoneValue.slice(3, 4)} ${telefoneValue.slice(4, 8)}`;
    } else if (telefoneValue.length <= 12) {
        telefone.value = `(${telefoneValue.slice(0, 3)}) ${telefoneValue.slice(3, 4)} ${telefoneValue.slice(4, 8)}-${telefoneValue.slice(8, 12)}`;
    }
    
    const isValid = validarTelefone(telefone.value)

    if(!isValid) {
        telefone.style.border = "2px solid red";
        telefone.style.boxShadow = "0 0 5px 5px rgba(255, 0, 0, 0.3)";
    } else {
        telefone.style.border = "2px solid rgba(34, 116, 164)";
        telefone.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";
    }
})
// Fim da validação telefone


// Validação cep
export function validarCep(cep) {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length == 8) {   
        return true;
    } else {
        return false;
    }
}

cep.addEventListener('focus', () => {
    cep.style.border = "2px solid rgba(34, 116, 164)";
    cep.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";
})

cep.addEventListener('blur', () => {
    const isValid = validarCep(cep.value)

    if (isValid) {
        cep.style.border = "";
        cep.style.boxShadow = "";
    } else {
        cep.style.border = "2px solid red";
        cep.style.boxShadow = "0 0 5px 5px rgba(255, 0, 0, 0.3)";
    }
})

cep.addEventListener('input', () => {
    cep.style.border = "2px solid rgba(34, 116, 164)";
    cep.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";

    let cepValue = cep.value.replace(/\D/g, "");

    if (cepValue.length <= 5) {
        cep.value = `${cepValue.slice(0, 5)}`;
    } else {
        cep.value = `${cepValue.slice(0, 5)}-${cepValue.slice(5, 8)}`;
    }

    const isValid = validarCep(cep.value)

    if(!isValid) {
        cep.style.border = "2px solid red";
        cep.style.boxShadow = "0 0 5px 5px rgba(255, 0, 0, 0.3)";
    } else {
        cep.style.border = "2px solid rgba(34, 116, 164)";
        cep.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";
    }
})
// Fim da validação cep


// Validação logradouro
export function validarLogradouro(logradouro) {
    let logradourotam = logradouro.value.length;

    if(logradourotam <= 5) {
        return false;
    } else {
        
        return true;
    }
}

logradouro.addEventListener('focus', () => {
    logradouro.style.border = "2px solid rgba(34, 116, 164)";
    logradouro.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";
})

logradouro.addEventListener('blur', () => {
    const isValid = validarLogradouro(logradouro)

    if (isValid) {
        logradouro.style.border = "";
        logradouro.style.boxShadow = "";
    } else {
        logradouro.style.border = "2px solid red";
        logradouro.style.boxShadow = "0 0 5px 5px rgba(255, 0, 0, 0.3)";
    }
})

logradouro.addEventListener('input', () => {
    logradouro.style.border = "2px solid rgba(34, 116, 164)";
    logradouro.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";

    const isValid = validarLogradouro(logradouro)

    if(!isValid) {
        logradouro.style.border = "2px solid red";
        logradouro.style.boxShadow = "0 0 5px 5px rgba(255, 0, 0, 0.3)";
    } else {
        logradouro.style.border = "2px solid rgba(34, 116, 164)";
        logradouro.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";
    }
})
// Fim da validação logradouro


// Validação numero
export function validarNumero(numero) {

    if (numero.value.length <= 0 || numero.value.length >= 5 ) {
        return false;
    }
        
    return true;
    
}

numero.addEventListener('focus', () => {
    numero.style.border = "2px solid rgba(34, 116, 164)";
    numero.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";
})

numero.addEventListener('blur', () => {
    const isValid = validarNumero(numero)

    if (isValid) {
        numero.style.border = "";
        numero.style.boxShadow = "";
    } else {
        numero.style.border = "2px solid red";
        numero.style.boxShadow = "0 0 5px 5px rgba(255, 0, 0, 0.3)";
    }
})

numero.addEventListener('input', () => {
    numero.style.border = "2px solid rgba(34, 116, 164)";
    numero.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";

    numero.value = numero.value.replace(/\D/g, '');

    const isValid = validarNumero(numero)

    if(!isValid) {
        numero.style.border = "2px solid red";
        numero.style.boxShadow = "0 0 5px 5px rgba(255, 0, 0, 0.3)";
    } else {
        numero.style.border = "2px solid rgba(34, 116, 164)";
        numero.style.boxShadow = "0 0 5px 5px rgba(34, 116, 164, 0.3)";
    }
})
// Fim da validação numero


export const validators =  { 
    validarEmail, 
    validarSenha, 
    validarNomeUser, 
    validarCpf, 
    validarTelefone, 
    validarCep, 
    validarLogradouro, 
    validarNumero 
}

