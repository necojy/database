<?php
// header("Content-type:test/html;charset=utf-8");
include "db_conn.php";

echo "<table border='1'>
<tr>
<th>餐廳名稱</th>
<th>餐廳網站</th>
<th>餐廳電話</th>
<th>餐廳地址</th>
<th>餐廳營業時間</th>
</tr>";


$query = ("SELECT * FROM restaurant");
$stmt = $db->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll();

for ($i = 0; $i < count($result); $i++) 
{
    echo "<tr>";
    echo "<td>".$result[$i]['name']."</td>";
    echo "<td>".$result[$i]['website']."</td>";
    echo "<td>".$result[$i]['phone']."</td>";
    echo "<td>".$result[$i]['address']."</td>";
    echo "<td>".$result[$i]['business_hour']."</td>";
    echo "</tr>";
}
echo "</table>";
echo "<br><input type ='button' onclick='history.back()' value='Go Back'></input>";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>




