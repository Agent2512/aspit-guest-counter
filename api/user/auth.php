<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$person=new stdClass();
$person->type="error";
$person->message="error";

echo json_encode($person);