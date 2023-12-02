<?php
//顯示餐廳總類及地址的列表
include "db_conn.php";
$query = ("SELECT restaurant.name, kinds, address from restaurant JOIN Category ON Restaurant.name = Category.name");
$stmt = $db->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll();

echo count($result)."+";

for ($i = 0; $i < count($result); $i++) 
{
    echo $result[$i]['name']."|"; // 若有 null ，將 null 換為空字串 ''
    echo $result[$i]['kind']."|";
    echo isset($result[$i]['address']) ? $result[$i]['address']."|" : ' '."|";
    echo "\n";
}
?>
