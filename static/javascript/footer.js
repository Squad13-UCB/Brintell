const footerHTML = `
    <footer class="rodape">
        <div class="social">
            <div class="social-icon">
                <a href="#"><i class="bi bi-gitlab"></i></a>
            </div>
            <div class="social-icon">
                <a href="#"><i class="bi bi-whatsapp"></i></a>
            </div>
            <div class="social-icon">
                <a href="#"><i class="bi bi-instagram"></i></a>
            </div>
            <div class="social-icon">
            <a href="#"><i class="bi bi-facebook"></i></a>
        </div>
        </div>
        <div class="copy">
            <p class="copy">&copy; 2024 Brintell. Todos os direitos reservados.</p>
        </div>
    </footer> 
`;

// Insere o rodapé no body
const body = document.getElementsByTagName('body')[0];	
body.insertAdjacentHTML('afterend', footerHTML);	
