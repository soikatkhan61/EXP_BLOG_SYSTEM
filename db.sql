
--all the tables are created here--
create table users (
    id int primary key AUTO_INCREMENT not NULL,
    name varchar (50) not null ,
    email varchar (50)not null ,
    password varchar (255)not null 
)

create table profiles (
    id int PRIMARY KEY AUTO_INCREMENT, user_id int , name varchar(50), address varchar (200), education varchar(200),skill varchar (300),
    FOREIGN KEY (user_id) REFERENCES users (id))

create table posts (
    post_id int, title varchar (200), body varchar (7000) , author int(7), tags varchar (100), category varchar (50), comments_count int(5),views_count int(10),like_count int (5),thumbnail varchar(100),readtime int(4), createdAt timestamp,
	PRIMARY KEY (post_id),
	FOREIGN KEY (author) REFERENCES users(id));

ALTER TABLE `posts` CHANGE `post_id` `post_id` INT(11) NOT NULL AUTO_INCREMENT;

create table comments (
	id int , post_id int, commentor int,comment_body varchar(2000), createdAt timestamp,
    PRIMARY KEY (id),
    FOREIGN KEY (post_id)  REFERENCES posts(post_id),
    FOREIGN KEY (commentor)  REFERENCES users(id)
);

create table categories (
	category varchar(100) UNIQUE NOT NULL,
    sub_category varchar(100) UNIQUE NOT NULL
);
ALTER TABLE `categories` CHANGE `sub_category` `sub_category` VARCHAR(100) NULL DEFAULT NULL;

INSERT INTO `categories`(`category`) VALUES ('Python');
INSERT INTO `categories`(`category`) VALUES ('NODE JS');
INSERT INTO `categories`(`category`) VALUES ('C++');
INSERT INTO `categories`(`category`) VALUES ('Go');
INSERT INTO `categories`(`category`) VALUES ('Ruby');
INSERT INTO `categories`(`category`) VALUES ('Assembly');
INSERT INTO `categories`(`category`) VALUES ('HTML');
INSERT INTO `categories`(`category`) VALUES ('CSS');
--all the tables are created ends here--


--JOIN--for finding author id when a author create a post
SELECT * FROM posts INNER JOIN users WHERE users.id=102 LIMIT 1

--for searching and limit
SELECT * FROM posts where title like '%${search_term}%' LIMIT 5