<?php
//更新餐廳的營業時間資訊
header("Content-type: text/html;charset=utf-8");
include_once "db_conn.php";
$name = $_POST["name"];
$hour = $_POST["business_hour"];
$query = ("UPDATE restaurant SET business_hour = ? WHERE name = ?");
$stmt = $db->prepare($query);
$result = $stmt->execute();

if ($result) echo "營業時間更新成功";
else echo "找不到符合條件的餐廳，營業時間未更新";
?>  