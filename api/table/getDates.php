<?php
require "../tableControl.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$data = json_decode(file_get_contents('php://input'));

if (isset($data->location)) {
    echo json_encode((new tableControl)->getDates(
        $data->location
    ));
} else {
    $Iapi["type"] = "error";
    $Iapi["message"] = "need all fields";
    echo json_encode($Iapi);
}
