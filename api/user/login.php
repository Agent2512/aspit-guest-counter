<?php
require("../userControl.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$data = json_decode(file_get_contents('php://input'));


$Iapi;
$Iapi["type"] = "error";
$Iapi["message"] = "error";

if (isset($data->username, $data->password)) {
    echo json_encode($Iapi);
} else {
    $Iapi["message"] = "need all fields";
    echo json_encode($Iapi);
}