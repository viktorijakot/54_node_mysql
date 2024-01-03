CREATE TABLE `bit_main`.`categories` (`cat_id` INT UNSIGNED NOT NULL AUTO_INCREMENT , `title` VARCHAR(255) NOT NULL , `post_id` INT UNSIGNED NOT NULL , PRIMARY KEY (`cat_id`)) ENGINE = InnoDB;

ALTER TABLE `posts` ADD `cat_id` INT UNSIGNED NOT NULL AFTER `content`;

INSERT INTO `categories` (`cat_id`, `title`) VALUES (NULL, 'Comedy'), (NULL, 'Tragedy'), (NULL, 'Detective'), (NULL, 'Thriller');

SELECT posts.post_id, posts.title, posts.author, posts.content, posts.date, categories.title AS catagoryName
FROM `posts`
JOIN `categories`
ON `posts`.`cat_id`=categories.cat_id