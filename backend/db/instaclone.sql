DROP DATABASE IF EXISTS instaclone;
CREATE DATABASE instaclone;

\c instaclone;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR,
  password_digest VARCHAR,
  email_add VARCHAR,
  fullname VARCHAR,
  profile_pic VARCHAR,
  user_description VARCHAR,
    UNIQUE(username)
);

INSERT INTO users (username, password_digest, email_add, fullname, profile_pic, user_description)
  VALUES ('OptimusPrime', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'optimusprime@gmail.com', 'Morgan Freeman', 'https://i.imgur.com/dM53kPP.jpg', 'this is me user one'),
    ('CookieMonster', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'cookiemonster@gmail.com', 'Kevin Malone', 'https://i.imgur.com/dM53kPP.jpg', 'Cooooookies'),
    ('Bird', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq', 'bird@gmail.com', 'Big Bird', 'https://i.imgur.com/dM53kPP.jpg', 'Bird is the word');
;

CREATE TABLE photos (
    photo_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    photo_link VARCHAR,
    caption VARCHAR
);

INSERT INTO photos (user_id, photo_link, caption)
    VALUES (1, 'https://i.imgur.com/GAbRAat.jpg', 'exactly'),
    (1, 'https://i.imgur.com/U5E9wVu.jpg', '<3'),
    (2, 'https://i.imgur.com/ZdQOwq1.jpg', 'sea and sky'),
    (2, 'https://i.imgur.com/Iuoi7Gg.jpg', 'paradise'),
    (2, 'https://i.imgur.com/vqGctDg.jpg', 'some profound quote here'),
    (2, 'https://i.imgur.com/RdjNiph.jpg', 'Me in my natural state'),
    (3, 'https://i.imgur.com/3eAA6j5.jpg', 'My best friend'),
    (3, 'https://i.imgur.com/EZ0Qnxg.jpg', 'Playing tourist.'),
    (3, 'https://i.imgur.com/BumKSM3.jpg', 'Random doggo');

CREATE TABLE likes (
    user_id INTEGER REFERENCES users,
    photo_id INTEGER REFERENCES photos
);

INSERT INTO likes (user_id, photo_id)
    VALUES (1, 1),
    (2, 1),
    (3, 1),
    (1, 2), 
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (2, 7),
    (2, 8),
    (2, 9);


CREATE TABLE user_followers (
    user_id INTEGER REFERENCES users,
    follower_id INTEGER
);

INSERT INTO user_followers (user_id, follower_id)
    VALUES (1, 3),
    (1, 2),
    (3, 2);

CREATE TABLE user_following (
    user_id INTEGER REFERENCES users,
    following_id INTEGER
);

INSERT INTO user_following (user_id, following_id)
    VALUES (1, 2),
    (2, 1);