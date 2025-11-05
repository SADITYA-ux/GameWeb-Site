<?php
require 'config.php';
session_start();

// admin check
if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['error' => 'Admin only']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Only POST allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$title = trim($input['title'] ?? '');
$description = trim($input['description'] ?? '');
$price = floatval($input['price'] ?? 0);
$category = trim($input['category'] ?? '');
$platform = trim($input['platform'] ?? '');
$image = trim($input['image'] ?? '');

if (!$title || $price <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Title and valid price required']);
    exit;
}

$stmt = $pdo->prepare('INSERT INTO games (title, description, price, category, platform, image) VALUES (?, ?, ?, ?, ?, ?)');
$stmt->execute([$title, $description, $price, $category, $platform, $image]);
$newId = $pdo->lastInsertId();

echo json_encode(['success' => true, 'id' => $newId]);
