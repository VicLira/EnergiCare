CREATE USER 'energi_care'@'%' IDENTIFIED BY 'EnergiCare@2023';
GRANT ALL PRIVILEGES ON *.* TO 'energi_care'@'%';
FLUSH PRIVILEGES;

CREATE DATABASE energi_care;
USE energi_care;

CREATE TABLE usuario (
	user_id int NOT NULL,
	nome varchar(255) NOT NULL,
	email varchar(80) NOT NULL,
	senha varchar(50) NOT NULL,
	compania_energia_id int NOT NULL,
	PRIMARY KEY (user_id)
);

CREATE TABLE eletrodomestico (
	eletrodomestico_id int NOT NULL,
	nome varchar(255) NOT NULL,
	consumo_em_watts int NOT NULL,
	PRIMARY KEY (eletrodomestico_id)
);

CREATE TABLE consumo_eletrodomestico (
	consumo_id int NOT NULL,
	horas_de_uso_diario FLOAT NOT NULL,
	user_id int NOT NULL,
	eletrodomestico_id int NOT NULL,
	PRIMARY KEY (consumo_id)
);

CREATE TABLE companhia_energia (
	companhia_id int NOT NULL,
	nome varchar(255) NOT NULL,
	PRIMARY KEY (companhia_id)
);

CREATE TABLE tarifa_energia (
	tarifa_id int NOT NULL,
	preco_por_kwh FLOAT NOT NULL,
	companhia_id int NOT NULL,
	PRIMARY KEY (tarifa_id)
);

CREATE TABLE dica_economia_energia (
	dica_id int NOT NULL,
	descricao TEXT NOT NULL,
	PRIMARY KEY (dica_id)
);

CREATE TABLE dica_usuario (
	dica_usuario_id int NOT NULL,
	user_id int NOT NULL,
	dica_id int NOT NULL,
	PRIMARY KEY (dica_usuario_id)
);

ALTER TABLE usuario ADD CONSTRAINT usuario_fk0 FOREIGN KEY (compania_energia_id) REFERENCES companhia_energia(companhia_id);

ALTER TABLE consumo_eletrodomestico ADD CONSTRAINT consumo_eletrodomesticos_fk0 FOREIGN KEY (user_id) REFERENCES usuario(user_id);

ALTER TABLE consumo_eletrodomestico ADD CONSTRAINT consumo_eletrodomesticos_fk1 FOREIGN KEY (eletrodomestico_id) REFERENCES eletrodomestico(eletrodomestico_id);

ALTER TABLE tarifa_energia ADD CONSTRAINT tarifas_energia_fk0 FOREIGN KEY (companhia_id) REFERENCES companhia_energia(companhia_id);

ALTER TABLE dica_usuario ADD CONSTRAINT dica_usuario_fk0 FOREIGN KEY (user_id) REFERENCES usuario(user_id);

ALTER TABLE dica_usuario ADD CONSTRAINT dica_usuario_fk1 FOREIGN KEY (dica_id) REFERENCES dica_economia_energia(dica_id);

SELECT * FROM eletrodomestico;


-- Inserir um eletrodoméstico
INSERT INTO eletrodomestico (eletrodomestico_id, nome, consumo_em_watts)
VALUES (1, 'Geladeira', 150);

-- Inserir uma companhia de energia
INSERT INTO companhia_energia (companhia_id, nome)
VALUES (1, 'Companhia A');

-- Inserir uma tarifa de energia
INSERT INTO tarifa_energia (tarifa_id, preco_por_kwh, companhia_id)
VALUES (1, 0.15, 1);

-- Inserir um usuário
INSERT INTO usuario (user_id, nome, email, senha, compania_energia_id) 
VALUES (1, 'João Silva', 'joao@email.com', 'senha123', 1);

-- Inserir o consumo de um eletrodoméstico por um usuário
INSERT INTO consumo_eletrodomestico (consumo_id, horas_de_uso_diario, user_id, eletrodomestico_id)
VALUES (1, 3.5, 1, 1);

-- Inserir uma dica de economia de energia
INSERT INTO dica_economia_energia (dica_id, descricao)
VALUES (1, 'Desligue os aparelhos quando não estiver em casa.');

-- Associar uma dica a um usuário
INSERT INTO dica_usuario (dica_usuario_id, user_id, dica_id)
VALUES (1, 1, 1);


