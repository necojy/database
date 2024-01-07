<?php
session_start();

if ($_SESSION['username']) {
    session_destroy();
    $response = array("logged_out" => true, "message" => "已登出");
    echo json_encode($response);
    exit;
} else {
    $response = array("logged_out" => false, "message" => "未登入");
    echo json_encode($response);
    exit;
}
?>