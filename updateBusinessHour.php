<?php
//更新餐廳的營業時間資訊
header("Content-type: text/html;charset=utf-8");
include_once "db_conn.php";

// $website=isset($_POST["website"]) ? $_POST["website"] : ' ';
// $phone=isset($_POST["phone"]) ? $_POST["phone"] : ' ';
// $address=isset($_POST["address"]) ? $_POST["address"] : ' ';


$query = ('update restaurant set business_hour = ? where name = ?');
$name = $_POST['name'];
$hour = $_POST['business_hour'];
$stmt = $db->prepare($query);
$result = $stmt->execute(array($hour,$name)); 

if ($result) echo "營業時間更新成功";
else echo "找不到符合條件的餐廳，營業時間未更新";
?>  
