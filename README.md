# Brii - Chatbot Inteligente para Suporte ao Cliente

## O que é a Brii?

A **BRII** é uma inteligência artificial desenvolvida para atuar como assistente no atendimento ao cliente. Seu objetivo é oferecer suporte automatizado, proporcionando respostas rápidas e eficientes para as necessidades dos usuários.

---

## Tecnologias Utilizadas

- **Backend:** Python, Flask
- **API:** OpenAI API
- **Frontend:** HTML, CSS, JavaScript
- **Banco de Dados:** Postgres
- **IDE:** Qualquer IDE ou editor de texto (VSCode recomendado)

---

## Como Rodar o Projeto

### 1. Executando Localmente com Flask

Certifique-se de que você tenha o Python 3.9+ instalado. Para rodar localmente, siga as etapas:

1. Clone o repositório:
   ```bash
   git clone https://gitlab.com/yesusvera/mentoria-rise-up-df-catolica
   cd mentoria-rise-up-df-catolica
   ```

2. Instale as dependências:
   - Baixe o arquivo `requirements.txt` da pasta `backend`:
     ```bash
     pip install -r backend/requirements.txt
     ```

3. Rode o servidor Flask:
   ```bash
   flask run
   ```

4. Acesse o projeto no navegador em `http://127.0.0.1:5000`.

### 2. Executando com Docker

Caso queira rodar o projeto em um servidor com Docker, basta utilizar o `Dockerfile` e o `docker-compose.yml`:

1. Construa a imagem Docker:
   ```bash
   docker-compose build
   ```

2. Inicie o serviço:
   ```bash
   docker-compose up
   ```

3. Acesse o projeto no navegador.

---

## Configurações Necessárias

1. **Python 3.9+**
2. **Bibliotecas:**
   - Flask: `pip install Flask`
   - OpenAI: `pip install openai`
3. **Conta OpenAI com API Key**: Você precisará de uma conta na OpenAI e sua chave de API para integrar o chatbot.
4. **Baixe o `requirements.txt`:**
   - Localize o arquivo `requirements.txt` e outro `requirements.txt` dentro da pasta `backend` e instale as dependências usando:
     ```bash
     pip install -r requirements.txt
     pip install -r backend/requirements.txt
     ```

---

## Funcionalidades Criadas

1. **Chatbot:**
   - **Contratação de planos:** Usuários podem contratar novos planos de serviços.
   - **Alteração de planos:** Permite a troca entre planos existentes.
   - **Visualização de planos:** Os usuários podem visualizar os detalhes dos planos.
   - **Abertura de chamados:** Facilita a solicitação de suporte.
   - **Visualização de chamados:** Permite verificar o status dos chamados abertos.

2. **Interface para Técnicos:**
   - Os técnicos podem visualizar chamados abertos e realizar atendimento diretamente pela plataforma.

---

## Evoluções Futuras

### 1. Integração com o WhatsApp
- **Transações mais rápidas e seguras:** Simplifica o processo de compra e consulta.
- **Aproxima empresas e clientes:** Proporciona atendimento direto e personalizado.
- **Melhora a experiência do consumidor:** Torna o atendimento mais conveniente e eficiente.
- **Aumenta a eficiência nas vendas:** Otimiza processos e impulsiona resultados.
- **Fortalece a fidelização:** Cria conexões mais sólidas e duradouras com os clientes.

### 2. Criação de um App Próprio
- **Atendimento centralizado:** Reúne todas as funcionalidades em uma única plataforma.
- **Experiência personalizada:** Oferece recursos sob medida para as necessidades dos clientes.
- **Maior controle e escalabilidade:** Facilita o gerenciamento de operações e a expansão de serviços.

---

## Estrutura do Projeto

```bash
squad-13-brintell/                 # Diretório principal do projeto, provavelmente o nome do time ou da squad no qual o projeto está sendo desenvolvido.
│
├── .editorconfig                  # Arquivo de configuração para padronização de editores de código, garantindo consistência no estilo de codificação entre diferentes desenvolvedores (indentação, espaçamento, etc.).
├── .gitignore                     # Arquivo que informa ao Git quais arquivos e pastas não devem ser versionados. Aqui geralmente estão as dependências, arquivos temporários ou dados sensíveis.
├── exemplo-docker-compose.yml      # Arquivo de exemplo para configuração do Docker Compose, usado para orquestrar a execução de containers Docker (por exemplo, para rodar a aplicação e banco de dados em containers separados).
├── exemplo-Dockerfile             # Arquivo exemplo para a construção de uma imagem Docker personalizada para o projeto.
├── exemplo-start.sh               # Script de inicialização que pode ser usado para configurar e rodar o projeto ou serviços relacionados.
├── README.md                      # Arquivo de documentação principal do projeto. Contém informações importantes como como rodar o projeto, instalar dependências, e outras diretrizes de uso.
│
├───backend/                       # Diretório contendo o código-fonte do backend da aplicação, que é responsável por toda a lógica do servidor, como Flask, comunicação com banco de dados, etc.
│   ├── .env.example               # Arquivo de exemplo para configurar variáveis de ambiente (ex: chave da API, configurações do banco de dados). Este arquivo deve ser copiado e renomeado para `.env` para ser usado no ambiente local.
│   ├── app.py                     # Arquivo principal do backend onde o Flask (ou outro framework) é configurado e as rotas para as requisições HTTP são definidas.
│   ├── db.py                      # Arquivo que contém a lógica de configuração e interação com o banco de dados.
│   ├── routes.py                  # Define as rotas do backend, ou seja, os endpoints que serão acessados pelo frontend ou outros sistemas.
│   
│   ├───services/                  # Diretório com a lógica de serviços, onde são implementadas as funcionalidades específicas do sistema.
│   │   ├── admin.py               # Lógica para a gestão de administradores, como criação, edição e exclusão de usuários/admins.
│   │   ├── cliente.py             # Lógica para o gerenciamento de clientes, incluindo cadastro, edição e exclusão de dados.
│   │   ├── funcoes.py             # Funções utilitárias que são usadas em diversas partes do sistema.
│   │   ├── login.py               # Lógica de autenticação, incluindo login de usuários e administração de sessões.
│   │   ├── openai.py              # Integração com a API do OpenAI, que pode ser usada para o chatbot ou outras funcionalidades de IA.
│   │   ├── plano.py               # Lógica relacionada ao gerenciamento de planos ou assinaturas dos usuários.
│   
│   ├───utils/                     # Diretório para utilitários, que contém funções auxiliares que são usadas em vários pontos do projeto.
│   │   └── validation.py          # Funções de validação (ex: checar se um e-mail é válido, senha tem o formato correto, etc.).
│   
├───bancodedados/                  # Diretório que contém todos os arquivos relacionados à configuração do banco de dados, como scripts SQL.
│   └── db.sql                     # Arquivo SQL com a estrutura inicial do banco de dados (tabelas, colunas, etc.).
│
├───brintell/                      # Diretório extra para informações adicionais ou outros exemplos relacionados ao banco de dados ou funcionalidades.
│   └── bancodedados/              # Diretório para arquivos SQL relacionados a desafios ou exemplos adicionais de banco de dados.
│       └── desafios_com_banco_de_dados.sql # Arquivo com desafios ou exemplos específicos relacionados ao uso do banco de dados.
├───static/                        # Diretório para arquivos estáticos que serão servidos pelo servidor, como CSS, imagens, e JavaScript.
│   ├───css/                       # Pasta com os arquivos de estilo CSS para a aplicação.
│   │   ├── base.css               # Arquivo de estilo base para toda a aplicação.
│   │   ├── styles-chamados.css    # Estilos específicos para a página de chamados.
│   │   ├── styles-chat-bot.css    # Estilos para o chatbot.
│   │   ├── styles-feedback.css    # Estilos para a página de feedback.
│   │   ├── styles-help.css        # Estilos para a página de ajuda.
│   │   ├── styles-login.css       # Estilos para a página de login.
│   │   ├── styles-profile-admin.css # Estilos para o perfil do administrador.
│   │   ├── styles-profile-client.css # Estilos para o perfil do cliente.
│   │   ├── styles-profile.css     # Estilos gerais para a página de perfil.
│   │   ├── styles-register-admin.css # Estilos para a página de registro do administrador.
│   │   ├── styles-register-client.css # Estilos para a página de registro do cliente.
│   │   ├── styles-settings.css    # Estilos para a página de configurações do usuário.
│   │   ├── styles-standard-footer.css # Estilos para o rodapé padrão.
│   │   ├── styles-standard-siderbar.css # Estilos para a sidebar padrão.
│   │
│   ├───images/                    # Diretório para imagens usadas na aplicação.
│   │   ├── brii-logo.png          # Logotipo da aplicação (possivelmente o logotipo principal).
│   │   ├── logo.png               # Outro logotipo da aplicação.
│   │   ├── LogoChatbotBrii.png    # Logotipo específico para a parte do chatbot.
│   │
│   └───javascript/                # Diretório com arquivos JavaScript usados no front-end para funcionalidades interativas e lógicas de página.
│       ├── app.js                 # Script JavaScript principal para funcionalidades gerais do front-end.
│       ├── chamados.js            # Script para interações na página de chamados.
│       ├── feedback.js            # Script para a lógica de feedback.
│       ├── ferramentas.js         # Funcionalidades adicionais para o front-end.
│       ├── footer.js              # Lógica para a interação com o rodapé da página.
│       ├── forms.js               # Lógica para validação e interação com formulários.
│       ├── logout.js              # Lógica para realizar o logout do sistema.
│       ├── page-interactions.js   # Lógica para interações gerais nas páginas.
│       ├── sidebarMenu.js         # Lógica para interação com o menu da sidebar.
│       ├── validation-and-mask-form-cadastro-admin.js # Validações e máscaras de campos no formulário de cadastro de administradores.
│       ├── validation-and-mask-form-cadastro-cliente.js # Validações e máscaras de campos no formulário de cadastro de clientes.
│       └── validation-and-mask-form-login.js # Validações e máscaras de campos no formulário de login.
│
└───templates/                     # Diretório contendo templates HTML que são usados para renderizar páginas do front-end.
    ├── cadastro-admin.html        # Página de template HTML para o cadastro de administradores.
    ├── cadastro-cliente.html      # Página de template HTML para o cadastro de clientes.
    ├── chamados.html              # Página de template para exibição e interação com chamados.
    ├── chat-bot.html              # Página de template para interação com o chatbot.
    ├── feedback.html              # Página de template para o feedback do usuário.
    ├── help.html                  # Página de template para ajuda ou FAQ.
    ├── login.html                 # Página de template para o login de usuários.
    ├── perfil-admin.html          # Página de template para o perfil de administradores.
    ├── perfil-cliente.html        # Página de template para o perfil de clientes.
    └── settings-user.html         # Página de template para as configurações do usuário.

```

---

## Colaboradores e Responsabilidades

- **Davi:** Gerenciamento do Back-end e Front-end
- **Miguel:** Gerenciamento do Front-end e Interface do Chat
- **Amin:** Interface do Chat
- **Daniel:** Detalhes de implementação
- **Hugo:** Sistema de Feedback
- **Izabel:** Sistema de Feedback
- **Flavio:** Interface dos Chamados Técnicos
- **Pedro:** Interface das Páginas de Cadastro e Login
- **Gabriel:** Desenvolvimento de Interfaces Relativas ao Usuário

---

## Sobre o Projeto

Este é um projeto básico de um chatbot integrado com a API da OpenAI, que permitirá aos usuários fazer perguntas e receber respostas geradas por um modelo de inteligência artificial (IA). O objetivo é oferecer uma plataforma prática para os mentorados aprenderem e aplicarem conhecimentos em Python, Flask, front-end (HTML/CSS/JavaScript), integração com IA, e desafios em back-end.

Este projeto foi planejado especialmente para os mentorados da Universidade Católica, levando em consideração seus diferentes níveis de experiência, com ênfase em proporcionar aprendizado prático e colaborativo.

## Objetivos

O projeto tem como principais objetivos:
- Familiarizar os envolvidos com o desenvolvimento full-stack (backend com Flask, frontend com HTML/CSS/JS).
- Apresentar conceitos básicos de Integração com IA usando a API da OpenAI.
- Proporcionar desafios em várias áreas (back-end, front-end, IA, banco de dados) para estimular a resolução de problemas.
- Incentivar a colaboração entre os mentorados para resolver os desafios propostos e compartilhar conhecimento.

---

## Desafios Propostos

### Backend:
- **Hugo:** Implementar uma lógica de cache para evitar chamadas repetidas à OpenAI.
- **Davi:** Adicionar autenticação básica, como um sistema simples de tokens.
- **Iza:** Integrar um banco de dados Postgres para armazenar perguntas e respostas.

### Frontend:
- **Flavio & Amin:** Implementar um sistema de histórico de conversas.
- **Gabriel & Daniel:** Melhorar a experiência do usuário com um indicador visual de "pensando".
- **Pedro:** Validar entradas do usuário (impedir envio de mensagens vazias).
- **Miguel:** Permitir ao usuário ajustar os parâmetros do modelo OpenAI diretamente pela interface.

---

## Conclusão

Este projeto tem como foco proporcionar aprendizado prático e colaborativo em várias áreas do desenvolvimento de software. 
Incentivamos todos a compartilhar suas ideias, ajudar uns aos outros e aproveitar essa oportunidade para adquirir novas habilidades!

---

## Contato

Para dúvidas ou orientação, entre em contato com o mentor.
