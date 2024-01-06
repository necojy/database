<?php
//根據店家名稱，刪除店家名字資訊
header("Content-type: text/html;charset=utf-8");
include_once "../db_conn.php";

$response = array();

$restaurantName = $_POST['name'];

// 檢查對象是否存在
$checkQuery = "SELECT COUNT(*) AS count FROM restaurant WHERE name = ?";
$checkStmt = $db->prepare($checkQuery);
$checkStmt->execute(array($restaurantName));
$count = $checkStmt->fetch(PDO::FETCH_ASSOC)['count'];

if ($count > 0) {
    // 對象存在，執行刪除操作
    $deleteQuery = "DELETE FROM restaurant WHERE name = ?";
    $deleteStmt = $db->prepare($deleteQuery);
    $result = $deleteStmt->execute(array($restaurantName));

    if ($result) {
        $response['status'] = "success";
        $response['message'] = "成功刪除店家：" . $restaurantName;
    } else {
        $response['status'] = "error";
        $response['message'] = "刪除失敗：" . $restaurantName;
    }
} else {
    // 對象不存在，返回相應的錯誤信息
    $response['status'] = "error";
    $response['message'] = "未找到：" . $restaurantName;
}

echo json_encode($response);
?>