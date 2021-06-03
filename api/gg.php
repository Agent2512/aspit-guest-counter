<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$person=new stdClass();
$person->firstName="niklas";
$person->lastName="gadeberg";

echo json_encode($person);