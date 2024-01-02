<?php
//新增餐廳總類資訊
include_once "../db_conn.php";

$name = $_POST["name"];
$kind = $_POST["kinds"];

$query = ("SELECT ntou_card, serves_way FROM category WHERE name = ?");
$stmt = $db->prepare($query);
$stmt->execute(array($name));
$result = $stmt->fetch();

if($result != false){
    $ntou_card = $result["ntou_card"];
    $serves_way = $result["serves_way"];
    $query = ("INSERT INTO category VALUES (?, ?, ?, ?)");
    $stmt = $db->prepare($query);
    $stmt->execute(array($name,$kind,$ntou_card,$serves_way)); 
}


?> 