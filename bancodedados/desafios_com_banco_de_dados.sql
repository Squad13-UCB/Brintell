-- Estrutura Inicial do Banco de Dados

-- Tabela de Usuários
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,                      -- Identificador único do usuário
    nome TEXT NOT NULL,                        -- Nome do usuário
    email TEXT UNIQUE NOT NULL,                -- E-mail único do usuário
    senha TEXT NOT NULL,                       -- Senha do usuário (recomenda-se usar hash em produção)
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Data e hora de criação do usuário
    ativo BOOLEAN DEFAULT TRUE                 -- Status do usuário (ativo ou inativo)
);

-- 1. Desafio: Implementar validação para garantir que o e-mail seja único e válido.
-- 2. Desafio: Armazenar senhas de forma segura usando hash e salt (não armazenar senhas em texto puro).
-- 3. Desafio: Gerenciar o status do usuário e permitir que usuários sejam desativados sem serem removidos.

-- Tabela de Interações
CREATE TABLE interacoes (
    id SERIAL PRIMARY KEY,                      -- Identificador único da interação
    usuario_id INTEGER REFERENCES usuarios(id), -- Referência ao usuário que fez a interação
    pergunta TEXT NOT NULL,                    -- Pergunta feita pelo usuário
    resposta TEXT NOT NULL,                    -- Resposta fornecida pelo chatbot
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Data e hora da interação
);

-- 1. Desafio: Manter o histórico de conversas para análise futura e monitoramento de desempenho.
-- 2. Desafio: Garantir que a relação entre `usuario_id` e `usuarios` seja mantida corretamente.
-- 3. Desafio: Considerar o tamanho dos campos de `pergunta` e `resposta` para suportar diferentes tamanhos de texto.

-- Tabela de Feedback
CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,                      -- Identificador único do feedback
    interacao_id INTEGER REFERENCES interacoes(id), -- Referência à interação relacionada
    usuario_id INTEGER REFERENCES usuarios(id),  -- Referência ao usuário que forneceu o feedback
    avaliacao INTEGER CHECK (avaliacao >= 1 AND avaliacao <= 5), -- Avaliação do feedback (1 a 5)
    comentario TEXT,                           -- Comentário adicional sobre a interação
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Data e hora do feedback
);

-- 1. Desafio: Capturar e armazenar feedback dos usuários para melhorar o desempenho do chatbot.
-- 2. Desafio: Relacionar o feedback com a interação e o usuário de forma adequada.
-- 3. Desafio: Implementar lógica para lidar com feedbacks sem comentários e garantir que a avaliação esteja dentro do intervalo permitido (1 a 5).

-- Índices e Otimização (opcional)
CREATE INDEX idx_usuario_id ON interacoes(usuario_id);  -- Índice para melhorar o desempenho das consultas por usuário
CREATE INDEX idx_interacao_id ON feedback(interacao_id); -- Índice para melhorar o desempenho das consultas por interação

-- 1. Desafio: Avaliar o impacto dos índices no desempenho das consultas e ajustá-los conforme necessário.
-- 2. Desafio: Considerar outras otimizações com base no uso real e no volume de dados.

-- Fim da Estrutura Inicial do Banco de Dados
