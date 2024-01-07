<?php
session_start();
header("Content-type: application/json; charset=utf-8");
include_once "../db_conn.php";

$response = ['success' => false, 'message' => 'Invalid username or password'];

$input_data = json_decode(file_get_contents('php://input'), true);
$username = isset($input_data['username']) ? $input_data['username'] : '';
$password = isset($input_data['password']) ? $input_data['password'] : '';

//驗證帳號密碼是否相符
$checkQuery = "SELECT COUNT(*) as count FROM user WHERE username = ? AND password = ?";
$checkStmt = $db->prepare($checkQuery);
$checkStmt->execute(array($username, $password));
$count = $checkStmt->fetch(PDO::FETCH_ASSOC)['count'];

if ($count > 0) {
    $_SESSION['username'] = $username;
    $response['success'] = true;
    $response['message'] = '成功登入';
} else {
    $response['message'] = '不正確的帳號或密碼';
}

echo json_encode($response);
?>