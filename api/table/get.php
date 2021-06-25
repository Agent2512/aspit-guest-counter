<?php
require "../tableControl.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$data = json_decode(file_get_contents('php://input'));

if (isset($data->format, $data->location, $data->date)) {
    echo json_encode((new tableControl)->get(
        $data->format, $data->location, $data->date
    ));
} else {
    $Iapi["type"] = "error";
    $Iapi["message"] = "need all fields";
    echo json_encode($Iapi);
}
