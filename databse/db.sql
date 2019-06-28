CREATE DATABASE database_links;
use database_links;
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);
-- Modificar tabla Users
ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
     MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2; --el id se va incrementar de dos en dos
    
DESCRIBE users;

SELECT * FROM users;

--Tabla de enlaces

CREATE TABLE links(
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,--Este dato se va crear por defecto igual a la fecha actual
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);
-- ALTER TABLE links ADD FOREIGN KEY(user_id) REFERENCES users(id)
ALTER TABLE links
    ADD PRIMARY KEY (id);

ALTER TABLE links
     MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE links;

SELECT * FROM links;
//////////////////////////////////////////////////////////////////////////////////////////

CREATE DATABASE MercadoNet;
use MercadoNet;
CREATE TABLE empresas(
    id INT(11)  PRIMARY KEY NOT NULL AUTO_INCREMENT,
    empresa VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    url_empresa VARCHAR(60)
);
    
DESCRIBE empresas;

ALTER TABLE empresas
     MODIFY empresa VARCHAR(60);

SELECT * FROM empresas;

--Tabla de enlaces

CREATE TABLE productos(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    productname VARCHAR(60) NOT NULL,
    price INT(6) NOT NULL,
    description TEXT,
    emp_id INT(11),
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (emp_id) REFERENCES empresas(id)
);

ALTER TABLE productos MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

SELECT * FROM productos;
-- sudo mysql -u root -p
-- https://www.anerbarrena.com/alter-table-mysql-5050/