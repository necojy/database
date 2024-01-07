<?php
session_start();
header("Content-type: application/json; charset=utf-8");
include_once "../db_conn.php";

// 檢查是否有 SESSION 登入
if (!isset($_SESSION['username']) || $_SESSION['username'] == false) {
    // 如果未登入，返回 JSON 格式的錯誤信息
    $response = array("logged_in" => false, "message" => "未登入");
    echo json_encode($response);
    exit;
}

// 如果已登入，返回 JSON 格式的成功信息
$response = array("logged_in" => true, "message" => "已登入");

error_log(json_encode($response));

echo json_encode($response);
?>
