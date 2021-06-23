<?php
require "../tableControl.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$data = json_decode(file_get_contents('php://input'));



if (isset(
    $data->location,
    $data->guests,
    $data->students,
    $data->zipcode,
    $data->username,
    $data->datetime
)) {
    $city = json_decode(file_get_contents("https://dawa.aws.dk/postnumre/autocomplete/?q=4660"))[0]->postnummer->navn;
    $data->city = $city;
    echo json_encode((new tableControl)->add(
        $data->location,
        $data->guests,
        $data->students,
        $data->zipcode,
        $data->username,
        $data->datetime,
        $data->city
    ));
} else {
    $Iapi["type"] = "error";
    $Iapi["message"] = "need all fields";
    echo json_encode($Iapi);
}
