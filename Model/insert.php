<?php
header("Content-type: text/html;charset=utf-8");
include_once "../db_conn.php";

$response = array();

$name = $_POST["name"];
$website = $_POST["website"];
$phone = $_POST["phone"];
$address = $_POST["address"];
$hour = $_POST["business_hour"];
$image = $_POST["image"];

try {
    $query = ("insert into restaurant values(?,?,?,?,?,?)");
    $stmt = $db->prepare($query);
    $result = $stmt->execute(array($name, $website, $phone, $address, $hour, $image));

    if ($result) {
        $response['status'] = "success";
        $response['message'] = "成功新增店家：" . $name;
    } else {
        $response['status'] = "error";
        $response['message'] = "新增失敗";
    }
} catch (PDOException $e) {
    $errorInfo = $e->errorInfo;
    $errorCode = $errorInfo[1];

    if ($errorCode === 1062) {
        // Duplicate entry for a unique key violation
        $response['status'] = "error";
        $response['message'] = "重複的主鍵值";
    } else {
        // Other PDOException
        $response['status'] = "error";
        $response['message'] = "發生其他錯誤";
    }
}

echo json_encode($response);
?>