-- Estrutura Inicial do Banco de Dados

CREATE TYPE tipo_conta_type AS ENUM ('a', 'c'); -- Define um enum para o tipo de conta

-- Tabela de Endereço
CREATE TABLE enderecos (
    id SERIAL PRIMARY KEY,                     -- Identificador único do endereço
    logradouro VARCHAR(50) NOT NULL,           -- Logradouro
    cep TEXT NOT NULL,                   -- CEP
    numero VARCHAR(3) NOT NULL,                -- Número
	cliente_id INTEGER UNIQUE			   -- Referência ao cliente que está atribuído ao endereço 
);

-- Tabela de Planos
CREATE TABLE planos (
    id SERIAL PRIMARY KEY,                     -- Identificador único do endereço
    nome VARCHAR(50) NOT NULL        
);

INSERT INTO planos (nome) VALUES ('150mbps');
INSERT INTO planos (nome) VALUES ('200mbps');
INSERT INTO planos (nome) VALUES ('300mbps');
INSERT INTO planos (nome) VALUES ('400mbps');

-- Tabela de Clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,                      -- Id do usuário (relação 1:1)
    cpf TEXT,                            -- CPF
    telefone TEXT,                       -- Telefone
    endereco_id INTEGER UNIQUE NOT NULL,         -- Referência ao endereço que está atribuído ao cliente 
    FOREIGN KEY (endereco_id) REFERENCES enderecos(id) ON DELETE CASCADE, -- Configuração da chave estrangeira
    plano_id INTEGER UNIQUE,         -- Referência ao endereço que está atribuído ao cliente 
	FOREIGN KEY (plano_id) REFERENCES planos(id) ON DELETE CASCADE, -- Configuração da chave estrangeira
	usuario_id INTEGER UNIQUE				-- Referência ao usuário que está atribuído ao cliente 
);

-- Tabela de Usuários
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,                      		-- Identificador único do usuário
    nome TEXT NOT NULL,                        			-- Nome do usuário
    email TEXT UNIQUE NOT NULL,                			-- E-mail único do usuário
    senha TEXT NOT NULL,                       			-- Senha do usuário (recomenda-se usar hash em produção)
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Data e hora de criação do usuário
    ativo BOOLEAN DEFAULT TRUE,                 		-- Status do usuário (ativo ou inativo)
    tipo_conta tipo_conta_type NOT NULL, 				-- A (admin) ou C (cliente)
    cliente_id INTEGER UNIQUE,         		-- Referência ao cliente (se houver algum atribuído)
	FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE, -- Configuração da constraint
	empresa_id INTEGER 		-- Referência a empresa (se for admin)
);

ALTER TABLE enderecos
ADD CONSTRAINT fk_cliente_id
FOREIGN KEY (cliente_id) REFERENCES clientes(id);

ALTER TABLE clientes
ADD CONSTRAINT fk_usuario_id
FOREIGN KEY (usuario_id) REFERENCES usuarios(id);

-- Tabela de Configuração da IA
CREATE TABLE empresa (
    id INTEGER PRIMARY KEY,        -- Identificador único da configuração
    nome TEXT DEFAULT 'Digital S/A',					  -- Nome da empresa
	email TEXT DEFAULT 'digitalsa@gmail.com',					  -- Email da empresa
	configuracao_ia_id INTEGER UNIQUE -- Referência a Configuração da IA
);

-- Tabela de Chamados Técnicos
CREATE TABLE chamados (
    id SERIAL PRIMARY KEY,
	nome TEXT NOT NULL,
	descricao TEXT NOT NULL,
	status TEXT NOT NULL,
	data TEXT NOT NULL,
	usuario_id INTEGER,         		
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
	cliente_id INTEGER not NULL,         		
	FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
	endereco_id INTEGER not NULL,         		
	FOREIGN KEY (endereco_id) REFERENCES enderecos(id) ON DELETE CASCADE
);

-- Adiciona a chave estrangeira da tabela usuarios
ALTER TABLE usuarios
ADD CONSTRAINT fk_empresa_id
FOREIGN KEY (empresa_id) REFERENCES empresa(id);

-- Tabela de Configuração da IA
CREATE TABLE configuracao_ia (
    id INTEGER PRIMARY KEY,                     -- Identificador único da configuração
	model TEXT DEFAULT 'gpt-3.5-turbo',						-- Modelo que será utilizado pela IA
    max_tokens INTEGER DEFAULT 100,             -- Controla o número de tokens gerados na resposta da IA
    top_p INTEGER DEFAULT 1,                    -- Controle de Aleatoriedade da IA
    temperature INTEGER DEFAULT 1,              -- Controle de Aleatoriedade da IA
    instructions TEXT DEFAULT '',        		-- Instruções da IA
	n INTEGER DEFAULT 1,						-- O número de respostas que o modelo deve gerar a cada prompt
	presence_penalty FLOAT DEFAULT 2, 						-- Controla a probabilidade do modelo repetir linhas
	frequency_penalty FLOAT DEFAULT 2,				-- Controla a probabilidade do modelo falar sobre novos tópicos
    data_modificacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data e hora da modificação
	empresa_id INTEGER REFERENCES empresa(id)
);

-- Adiciona a chave estrangeira da tabela empresa
ALTER TABLE empresa
ADD CONSTRAINT fk_configuracao_ia_id
FOREIGN KEY (configuracao_ia_id) REFERENCES configuracao_ia(id);

-- Estas tabelas são padrão e serão iniciadas junto com o banco de dados
-- para cada uma, só existirá apenas um registro, que sofrerá modificações
-- conforme as necessidades do admin
INSERT INTO empresa (id) VALUES (1);
INSERT INTO configuracao_ia (id) VALUES (1);

UPDATE empresa SET configuracao_ia_id = 1;
UPDATE configuracao_ia SET empresa_id = 1;

-- Tabela de conversas
CREATE TABLE conversas (
    id SERIAL PRIMARY KEY,                      -- Identificador único da interação
	usuario_id INTEGER REFERENCES usuarios(id) -- Referência ao usuário que fez a interação
);

-- Tabela de Interações
CREATE TABLE interacoes (
    id SERIAL PRIMARY KEY,                      -- Identificador único da interação
    conversa_id INTEGER NOT NULL REFERENCES conversas(id) ON DELETE CASCADE, -- Referência ao usuário que fez a interação
    pergunta TEXT NOT NULL,                    -- Pergunta feita pelo usuário
    resposta TEXT NOT NULL,                    -- Resposta fornecida pelo chatbot
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP    -- Data e hora da interação
);

-- Tabela de Feedback
CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,                      -- Identificador único do feedback
    cliente_id INTEGER REFERENCES clientes(id),  -- Referência ao usuário que forneceu o feedback
    avaliacao INTEGER CHECK (avaliacao >= 1 AND avaliacao <= 5), -- Avaliação do feedback (1 a 5)
    comentario TEXT,                           -- Comentário adicional sobre a interação
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP    -- Data e hora do feedback
);
