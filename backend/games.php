<?php
require 'config.php';
session_start();

header('Content-Type: application/json');

// optional filters
$category = $_GET['category'] ?? null;
$platform = $_GET['platform'] ?? null;
$search = $_GET['q'] ?? null;

$sql = 'SELECT id, title, description, price, category, platform, image FROM games';
$clauses = [];
$params = [];

if ($category) { $clauses[] = 'category = ?'; $params[] = $category; }
if ($platform) { $clauses[] = 'platform = ?'; $params[] = $platform; }
if ($search) { $clauses[] = '(title LIKE ? OR description LIKE ?)'; $params[] = "%$search%"; $params[] = "%$search%"; }

if ($clauses) $sql .= ' WHERE ' . implode(' AND ', $clauses);

$sql .= ' ORDER BY created_at DESC';

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$games = $stmt->fetchAll();

echo json_encode(['games' => $games]);
