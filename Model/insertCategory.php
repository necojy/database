<?php
//新增餐廳總類資訊
include_once "../db_conn.php";

$response = array();

try {
    $name = isset($_POST["name"]) ? $_POST["name"] : null;
    $kind = isset($_POST["kinds"]) ? $_POST["kinds"] : null;

    if ($name !== null && $kind !== null) {
        // 先檢查是否是第一筆，如果不是則維護： name, kind -> ntou_card, serves_way
        $queryCheck = "SELECT ntou_card, serves_way FROM category WHERE name = ?";
        $stmtCheck = $db->prepare($queryCheck);
        $stmtCheck->execute(array($name));
        $resultCheck = $stmtCheck->fetch();

        if ($resultCheck !== false) { //從資料庫拿
            $ntou_card = $resultCheck["ntou_card"];
            $serves_way = $resultCheck["serves_way"];
        } else {                      //從前端拿
            $ntou_card = $_POST["ntou_card"];
            $serves_way = $_POST["serves_way"];
        }

        // 插入新數據
        $queryInsert = "INSERT INTO category VALUES (?, ?, ?, ?)";
        $stmtInsert = $db->prepare($queryInsert);
        $resultInsert = $stmtInsert->execute(array($name, $kind, $ntou_card, $serves_way));

        if ($resultInsert) {
            $response['status'] = "success";
            $response['message'] = "成功新增餐廳總類資訊";
        } else {
            $response['status'] = "error";
            $response['message'] = "新增失敗";
        }
    } else {
        $response['status'] = "error";
        $response['message'] = "缺少必要的資訊";
    }
} catch (PDOException $e) {
    $errorInfo = $e->errorInfo;
    $errorCode = $errorInfo[1];

    if ($errorCode === 1062) {
        // Duplicate entry for a unique key violation
        $response['status'] = "error";
        $response['message'] = "此店名與種類已存在";
        //$response['message'] = $errorInfo[2];
    } else if ($errorCode === 1452) {
        // Foreign key constraint violation
        $response['status'] = "error";
        $response['message'] = "此餐廳名稱不存在";
        //$response['message'] = $errorInfo[2];
    } else {
        // Other PDOException
        $response['status'] = "error";
        $response['message'] = "發生其他錯誤：" . $e->getMessage();
    }
}
echo json_encode($response);
?> 