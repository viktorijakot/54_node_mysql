-- create table

CREATE TABLE `bit_main`.`books` 
(`book_id` INT NOT NULL AUTO_INCREMENT , 
`title` VARCHAR(255) NOT NULL , 
`author` VARCHAR(255) NOT NULL , 
`year` INT(4) NOT NULL , PRIMARY KEY (`book_id`)) 
ENGINE = InnoDB;

INSERT INTO `books` 
(`book_id`, `title`, `author`, `year`) 
VALUES 
(NULL, 'Name 1', 'Author 1', '1900'), 
(NULL, 'Name 2', 'Author 2', '2000')

INSERT INTO `books` 
(`book_id`, `title`, `author`, `year`) 
VALUES 
(NULL, 'Name 3', 'Author 3', '2010'), 
(NULL, 'Name 4', 'Author 4', '2020');