-- 🎮 GameZone Database Setup
CREATE DATABASE IF NOT EXISTS gamezone;
USE gamezone;

-- 🧍 USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user'
);

-- 👑 Default Admin Account
INSERT INTO users (username, email, password, role)
VALUES ('admin', 'admin@gamezone.com', '$2y$10$exampleHashedPassword', 'admin');
-- (You can later change password via PHP login/register system)

-- 🎮 GAMES TABLE
CREATE TABLE IF NOT EXISTS games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🛒 CART TABLE
CREATE TABLE IF NOT EXISTS cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  game_id INT,
  quantity INT DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (game_id) REFERENCES games(id)
);

-- 🎮 Sample Games
INSERT INTO games (title, description, price, image)
VALUES
('Cyber Quest', 'A futuristic open-world adventure.', 59.99, 'uploads/cyberquest.jpg'),
('Pixel Warriors', 'Retro-style 2D action game.', 19.99, 'uploads/pixelwarriors.jpg'),
('Racing Fury', 'High-speed racing simulator.', 39.99, 'uploads/racingfury.jpg');
