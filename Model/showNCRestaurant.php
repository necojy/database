<?php
include_once "../db_conn.php";
$query = ("SELECT * FROM restaurant where name in (SELECT name FROM category WHERE ntou_card = '是')");
$stmt = $db->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll();

echo count($result)."+";

for ($i = 0; $i < count($result); $i++) 
{
    echo $result[$i]['name']."|"; // 若有 null ，將 null 換為空字串 ''
    echo isset($result[$i]['website']) ? $result[$i]['website']."|" : ' '."|";
    echo isset($result[$i]['phone']) ? $result[$i]['phone']."|" : ' '."|";
    echo isset($result[$i]['address']) ? $result[$i]['address']."|" : ' '."|";
    echo isset($result[$i]['business_hour']) ? $result[$i]['business_hour']: ' ';
    echo "\n";
}
?>