<?php
require 'config.php';
session_start();

// allow CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }

if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['error'=>'Admin only']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error'=>'Only POST']);
    exit;
}

if (!isset($_FILES['image'])) {
    http_response_code(400);
    echo json_encode(['error'=>'No file uploaded']);
    exit;
}

$uploadsDir = __DIR__ . '/uploads';
if (!is_dir($uploadsDir)) mkdir($uploadsDir, 0755, true);

$file = $_FILES['image'];
$allowed = ['image/jpeg','image/png','image/webp'];
if (!in_array($file['type'], $allowed)) {
    http_response_code(400);
    echo json_encode(['error'=>'Only JPG/PNG/WEBP allowed']);
    exit;
}

$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
$basename = bin2hex(random_bytes(10)) . '.' . $ext;
$target = $uploadsDir . '/' . $basename;

if (!move_uploaded_file($file['tmp_name'], $target)) {
    http_response_code(500);
    echo json_encode(['error'=>'Upload failed']);
    exit;
}

echo json_encode(['success'=>true, 'filename'=>$basename]);
