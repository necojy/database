<?php
//統計能使用海大卡的店家個數
include_once "db_conn.php";

$query = ("SELECT count(distinct name) FROM category WHERE ntou_card = '是'");
$stmt = $db->prepare($query);
$stmt->execute();
$count = $stmt->fetchColumn();
echo $count;

?> 