<?php
require("../userControl.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$data = json_decode(file_get_contents('php://input'));


if (isset($data->username, $data->password)) {

    echo json_encode((new userControl)->signup($data->username, $data->password));
} else {
    $Iapi["type"] = "error";
    $Iapi["message"] = "need all fields";
    echo json_encode($Iapi);
}
