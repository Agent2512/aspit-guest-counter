<?php
require("../userControl.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$data = json_decode(file_get_contents('php://input'));


if (isset($data->token)) {
    echo json_encode((new userControl)->auth($data->token));
} else {
    $Iapi["type"] = "error";
    $Iapi["message"] = "need all fields";
    echo json_encode($Iapi);
}
