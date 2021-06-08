<?php
require("../userControl.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$data = json_decode(file_get_contents('php://input'));

$Iapi;
$Iapi["type"] = "error";
$Iapi["message"] = "error";

if (isset($data->username, $data->password)) {
    // $Iapi["type"] = "success";
    // $Iapi["message"] = "success";

    echo json_encode((new userControl())->signup($data->username, $data->password));
} else {
    $Iapi["message"] = "need all fields";
    echo json_encode($Iapi);
}
