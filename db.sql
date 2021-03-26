CREATE DATABASE IF NOT EXISTS user_sample;
USE user_sample;

CREATE TABLE IF NOT EXISTS user (
	id INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(32) NOT NULL,
    friendCode VARCHAR(200),
    points INTEGER NOT NULL
);
insert INTO user (name, email, phone, friendCode, points) VALUES ('Fulano da Silva', 'fulano@fulano.com', '5551999999999', sha1('fulano@fulano.com'), 5);
insert INTO user (name, email, phone, friendCode, points) VALUES ('Ciclano Santos', 'clano@fulano.com', '5551999999998', sha1('ciclano@fulano.com'), 2);

DELIMITER //

CREATE PROCEDURE getUserData(_email VARCHAR(150)) 
BEGIN   
    DECLARE _rank  INT unsigned DEFAULT -1;

   SELECT name, friendCode, points, 1 + (SELECT count( * ) FROM user a WHERE a.points > b.points ) AS _rank FROM
user b WHERE email = _email ORDER BY _rank LIMIT 1 ;

    
END; //

DELIMITER ;