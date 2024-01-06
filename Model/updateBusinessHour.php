<?php
//更新餐廳的營業時間資訊
header("Content-type: text/html;charset=utf-8");
include_once "../db_conn.php";

$response = array();

$name = $_POST['name'];
$hour = $_POST['business_hour'];
// $website=isset($_POST["website"]) ? $_POST["website"] : ' ';
// $phone=isset($_POST["phone"]) ? $_POST["phone"] : ' ';
// $address=isset($_POST["address"]) ? $_POST["address"] : ' ';

// 檢查對象是否存在
$checkQuery = "SELECT COUNT(*) AS count FROM restaurant WHERE name = ?";
$checkStmt = $db->prepare($checkQuery);
$checkStmt->execute(array($name));
$count = $checkStmt->fetch(PDO::FETCH_ASSOC)['count'];

if ($count > 0) {
    // 對象存在，修改營業時間
    $query = ('update restaurant set business_hour = ? where name = ?');
    
    $stmt = $db->prepare($query);
    $result = $stmt->execute(array($hour,$name)); 

    if ($result) {
        $response['status'] = "success";
        $response['message'] = "營業時間更新成功";
    } else {
        $response['status'] = "error";
        $response['message'] = "找不到符合條件的餐廳，營業時間未更新";
    }
} else {
    // 對象不存在，返回相應的錯誤信息
    $response['status'] = "error";
    $response['message'] = "未找到：" . $name;
}

echo json_encode($response);
?>
