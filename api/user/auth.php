<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$bool = true;

if ($bool == true) {
    $person = new stdClass();
    $person->type = "error";
    $person->message = "error";

    echo json_encode($person);
} else {
    $person["type"] = "success";
    $person["message"] = "success";

    $person["jwt"]= "555321ddd";
    echo json_encode($person);
}
