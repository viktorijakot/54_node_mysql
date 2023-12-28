-- Create posts table

CREATE TABLE `bit_main`.`posts` 
(`post_id` INT NOT NULL AUTO_INCREMENT , 
`title` VARCHAR(255) NOT NULL , 
`author` VARCHAR(255) NOT NULL , 
`date` DATE NOT NULL, 
`content` TEXT NOT NULL , PRIMARY KEY (`post_id`)) 
ENGINE = InnoDB;

-- insert to rows
INSERT INTO `posts` 
(`title`, `author`, `date`, `content`) 
VALUES 
('Post 1', 'James Band', '2023-12-27', 'Body of post 1'), 
('Post 2', 'Jane Dow', '2023-12-28', 'Body of post 2')

-- add new ones
INSERT INTO `posts` (`title`, `author`, `date`, `content`)
VALUES
('Post 3', 'James Band', '2023-12-24', 'Body of post 3'),
('Post 4', 'Jane Dow', '2023-12-25', 'Body of post 4'),
('Post 5', 'Jane Dow', '2023-12-25', 'Body of post 5')

-- get all posts
SELECT * FROM `posts1`