<?php
include "db_conn.php";
$query = "SELECT * FROM restaurant";
$stmt = $db->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll();

echo count($result)."+";

for ($i = 0; $i < count($result); $i++) 
{
    echo $result[$i]['name']."|";
    echo $result[$i]['website']."|";
    echo $result[$i]['phone']."|";
    echo $result[$i]['address']."|";
    echo $result[$i]['business_hour'];
    echo "\n";
}
?>
