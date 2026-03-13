CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20)
);

CREATE TABLE quadro (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE coluna (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    ordem INTEGER NOT NULL,
    quadro_id INTEGER NOT NULL,
    CONSTRAINT fk_coluna_quadro
        FOREIGN KEY (quadro_id)
        REFERENCES quadro(id)
        ON DELETE CASCADE
);

CREATE TABLE card (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
    coluna_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    CONSTRAINT fk_card_coluna
        FOREIGN KEY (coluna_id)
        REFERENCES coluna(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_card_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuario(id)
        ON DELETE CASCADE
);