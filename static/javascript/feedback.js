let avaliacao = 0;

document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star');
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    const feedbackText = document.querySelector('.feedback-text');
    const submitButton = document.querySelector('#submit-feedback');
    const responseMessage = document.querySelector('#response-message');

    // Função para atualizar as estrelas com base na seleção
    function updateStars() {
        stars.forEach((star, index) => {			
            if (index < avaliacao) {
                star.style.color = 'yellow';
                star.style.transform = 'translateY(-.2rem)';
                star.style.filter = 'drop-shadow(0rem 0.4rem 0.2rem rgba(0, 0, 0, 0.3))';
            } else {
                star.style.color = 'var(--gray)';
                star.style.transform = '';
                star.style.filter = '';
            }
        });
    }

    // Adiciona um evento de clique para atualizar a avaliação com base nas estrelas
    stars.forEach((star, index) => {
        star.addEventListener('click', function() {
            avaliacao = index + 1;
            updateStars();
        });
    });

    // Adiciona um evento ao botão para enviar a avaliação
    submitButton.addEventListener('click', async function() {
        if (avaliacao === 0 ) {
            responseMessage.textContent = 'Por favor, avalie com as estrelas de 1 a 5 antes de enviar!';
            responseMessage.style.color = 'red';
        } else {
			const body = {
				avaliacao,
				comentario: feedbackText.value || '',
				cliente_id: usuario.cliente_id
			}
			
			const resposta = await fetch(`/create-feedback`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body)
			});

			const data = await resposta.json()
			console.log({data});
			
			if (data.sucesso) {				
				responseMessage.textContent = data.sucesso;
				responseMessage.style.color = 'green';
			}
        }
    });
});

(async () => {	
	const resposta = await fetch(`/get-feedback/${usuario.cliente_id}`, {
		method: 'GET',
	});
	
	const data = await resposta.json()
	
	if (data.sucesso.avaliacao) {
		const {avaliacao: ava, comentario} = data.sucesso
		const stars = document.querySelectorAll('.star');
		avaliacao = ava
		stars.forEach((star, index) => {
            if (index < avaliacao) {
                star.style.color = 'var(--light-blue)';
            } else {
                star.style.color = 'var(--gray)';
            }
        });

		document.querySelector('.feedback-text').value = comentario;
	}	
})()