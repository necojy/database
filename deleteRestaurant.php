<?php
//根據店家名稱，刪除店家名字資訊
header("Content-type: text/html;charset=utf-8");
include_once "db_conn.php";
$restaurantName = $_POST['name'];
$query = "DELETE FROM restaurant WHERE name = ?";
$stmt = $db->prepare($query);
$result = $stmt ->execute();
if ($result) {
    echo "成功刪除店家：" . $restaurantName;
} else {
    echo "刪除失敗：" . $restaurantName;
}
?> 