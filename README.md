# Projeto Chatbot Inteligente com Flask e OpenAI

## Sobre o Projeto

Este é um projeto básico de um chatbot integrado com a API da OpenAI, que permitirá aos usuários fazer perguntas e receber respostas geradas por um modelo de inteligência artificial (IA). O objetivo é oferecer uma plataforma prática para os mentorados aprenderem e aplicarem conhecimentos em Python, Flask, front-end (HTML/CSS/JavaScript), integração com IA, e desafios em back-end.

Este projeto foi planejado especialmente para os mentorados da Universidade Católica, levando em consideração seus diferentes níveis de experiência, com ênfase em proporcionar aprendizado prático e colaborativo.

## Objetivos

O projeto tem como principais objetivos:
- Familiarizar os envolvidos com o desenvolvimento full-stack (backend com Flask, frontend com HTML/CSS/JS).
- Apresentar conceitos básicos de Integração com IA usando a API da OpenAI.
- Proporcionar desafios em várias áreas (back-end, front-end, IA, banco de dados) para estimular a resolução de problemas.
- Incentivar a colaboração entre os mentorados para resolver os desafios propostos e compartilhar conhecimento.

## Requisitos

### Tecnologias Utilizadas
- Backend: Python, Flask
- API: OpenAI API
- Frontend: HTML, CSS, JavaScript
- Banco de Dados: Postgres
- IDE: Qualquer IDE ou editor de texto (VSCode recomendado)

### Configurações Necessárias
1. Python 3.9+
2. Bibliotecas:
   - Flask: `pip install Flask`
   - OpenAI: `pip install openai`
3. Conta OpenAI com API Key.

### Clonando o Repositório
```bash
git clone https://gitlab.com/yesusvera/mentoria-rise-up-df-catolica
cd mentoria-rise-up-df-catolica
```

---

## Estrutura do Projeto

```bash
mentoria-rise-up-df-catolica/
│
├── /                        # Diretório do Backend (Flask)
│   ├── app.py               # Arquivo principal com as rotas e lógica do chatbot
│   ├── requirements.txt     # Dependências Python do projeto
│   ├── static/              # Diretório para arquivos estáticos (CSS, JS)
│   │   ├── styles.css       # Estilos da página
│   │   ├── app.js           # Lógica do front-end (requisições para o backend)
│   └── templates/           # Diretório para arquivos de template (HTML)
│       ├── index.html       # Interface web básica para interação com o chatbot
│   └── bancodedados/                  # Diretório com arquivos para banco de dados
│       ├── estruturainicial.sql       # Interface web básica para interação com o chatbot
└── README.md                # Este arquivo com a estrutura do projeto e informações gerais

```

---

## Passo a Passo para Rodar o Projeto

### Backend
1. Instale as dependências:
   No diretório `/`, execute:
   ```bash
   pip install -r requirements.txt
   ```

2. Configure a chave da OpenAI:
   Acesse: https://platform.openai.com/api-keys e gere sua chave
   Substitua `'sua-chave-api-openai'` pela sua chave de API no arquivo `app.py`.

3. Inicie o servidor Flask:
   ```bash
   python app.py
   ```
   O servidor estará rodando em `http://localhost:5000`.

### Frontend
1. Abra a url `http://localhost:5000/` no seu navegador.
2. Insira uma pergunta e veja a resposta gerada pela IA.

---

## Desafios Propostos

Durante o desenvolvimento do projeto, cada integrante terá a oportunidade de enfrentar desafios específicos de acordo com seu nível de conhecimento e área de interesse.

Desafios para o Backend:

Hugo: Implementar uma lógica de cache simples para evitar chamadas repetidas à OpenAI.
Davi: Adicionar autenticação básica ao projeto, como um sistema simples de tokens.
Iza: Integrar um banco de dados Postgres para armazenar perguntas e respostas.

Desafios para o Frontend:

Flavio e Amin: Implementar um sistema de histórico de conversas no frontend que guarde as últimas 5 interações.
Gabriel e Daniel: Melhorar a experiência do usuário com um indicador visual de "pensando" enquanto a IA processa a resposta.
Pedro: Tentar validar e melhorar as entradas do usuário (por exemplo, impedir o envio de mensagens vazias).
Miguel: Adicionar uma funcionalidade que permita o usuário fazer ajustes nos parâmetros do modelo OpenAI diretamente pela interface (ex: alterar o número de tokens).


Desafio Avançado com banco de dados

   Deixei uma pasta ./bancodedados com um arquivo estruturainicial.sql
---

## Colaboradores - Levantamento Inicial de conhecimentos

- Davi: Experiência em front e back-end.
- Flavio: Boa comunicação, ainda sem experiência com IA.
- Miguel: Iniciante, sem experiência com banco de dados.
- Pedro: Iniciante, buscando oportunidade de aprendizado.
- Hugo: Experiência com back-end, deseja aprender IA.
- Iza: Experiência com Python e MySQL.
- Gabriel: Pouca experiência com Java.
- Daniel: Conhecimentos em HTML e Java.
- Amin: Pouca experiência com HTML e Java.

---

## Tema do projeto 

Tema: Manuais/tutoriais básicos de tecnologia

Público alvo: principalmente idosos

Descrição: A maioria da população idosa têm dificuldade em usar tecnologias consideradas cotidianas, como mexer na TV, redes sociais, etc. Com a api do chatgpt, podemos criar uma maneira de termos instruções de como os idosos podem superar essa adversidade.

Orientações Técnicas para o Desenvolvimento

1. Integração da API do WhatsApp

   - Utilizar a API do WhatsApp para enviar e receber mensagens. Pesquisar e ver como integrar isto com o Python.

2. Desenvolvimento dos Manuais/Tutoriais
   - Criar tutoriais (Prompts) simples e claros, com linguagem acessível e explicativa.
   - Configurar os Prompts no OpenAPI.


## Conclusão

Este projeto tem como foco proporcionar aprendizado prático e colaborativo em várias áreas do desenvolvimento de software. 
Incentivamos todos a compartilhar suas ideias, ajudar uns aos outros e aproveitar essa oportunidade para adquirir novas habilidades!


---

## Contato

Para dúvidas ou orientação, entre em contato com o mentor.

---