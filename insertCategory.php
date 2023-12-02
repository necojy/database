<?php
//新增餐廳總類資訊
include_once "db_conn.php";

$name = $_POST["name"];
$kind = $_POST["kind"];
$ntou_card = $_POST["ntou_card"];
$serves_way = $_POST["serves_way"];

$query = ("INSERT INTO category VALUES (?, ?, ?, ?)");
$stmt = $db->prepare($query);
$stmt->execute(array($name,$kind,$ntou_card,$serves_way)); 
?> 