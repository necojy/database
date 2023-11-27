<?php
header("Content-type: text/html;charset=utf-8");
include_once "db_conn.php";
$name = $_POST["name"];
$website = $_POST["website"];
$phone = $_POST["phone"];
$address = $_POST["address"];
$hour = $_POST["business_hour"];


$query = ("insert into restaurant values(?,?,?,?,?)");
$stmt = $db->prepare($query);
$stmt->execute(array($name,$website,$phone,$address,$hour)); 
?>  