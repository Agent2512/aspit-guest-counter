<?php
require("dbConnect.php");

class tableControl
{
    private $db;
    /**@var string[] $Iapi */
    private $Iapi;
    public function __construct()
    {
        $this->db = new dbConnect();

        $this->Iapi["type"] = "error";
        $this->Iapi["message"] = "error";
    }

    public function add(
        $location,
        $guests,
        $students,
        $zipcode,
        $username,
        $datetime,
        $city
    ) {
        $Iapi = $this->Iapi;

        $sql = "INSERT INTO `visitters` (`location`, `form_zipcode`, `form_city`, `guests`, `students`, `createdby`, `dateTime`) VALUES ('$location', '$zipcode', '$city', '$guests', '$students', '$username', '$datetime')";

        $bool = $this->db->createData($sql);

        if ($bool) {
            $Iapi["type"] = "success";
            $Iapi["message"] = "data is registered";
            return $Iapi;
        } else {
            return $Iapi;
        }
    }

    public function get($_format, $_location, $_date)
    {
        $Iapi = $this->Iapi;

        $location = $_location == "all" ? "" : "`location` = \"$_location\"";
        $date = $_format == "year" ? "" : "`dateTime` REGEXP \"$_date\"";
        $where = "WHERE " . $location . " && " . $date;
        if ($location == "" && $date == "") {
            $where = "";
        } else if ($location == "" || $date == "") {
            $where = str_replace(" && ", "", $where);
        }

        $sql = "SELECT * FROM `visitters` $where";
        $data = $this->db->getData($sql);

        $table = [];
        $dates = [];

        if ($data) {
            if ($_format == "year") {
                for ($i=0; $i < count($data); $i++) { 
                    $element = $data[$i];
                    $year = date("Y", strtotime($element["dateTime"]));
    
                    if (in_array($year, $dates)==false) {
                        array_push($dates, $year);
                    }

                    $index = array_search($year, $dates);

                    if (isset($table[$index]) == false) {
                        array_push($table, [
                            "year" => $year,
                            "students" => intval($element["students"]),
                            "guests" => intval($element["guests"])
                        ]);
                    } 
                    else {
                        $table[$index]["students"] += intval($element["students"]);
                        $table[$index]["guests"] += intval($element["guests"]);
                    }
                }
                
    
            }
            else if ($_format == "day") {
                for ($i=0; $i < count($data); $i++) {
                    $element = $data[$i];
                    $date = date("Y-m-d H:i", strtotime($element["dateTime"]));

                    if (in_array($date, $dates)==false) {
                        array_push($dates, $date);
                    }

                    $index = array_search($date, $dates);

                    if (isset($table[$index]) == false) {
                        array_push($table, [
                            "date" => $date,
                            "students" => intval($element["students"]),
                            "guests" => intval($element["guests"])
                        ]);
                    } 
                    else {
                        $table[$index]["students"] += intval($element["students"]);
                        $table[$index]["guests"] += intval($element["guests"]);
                    }
                }
            }
        }
        

        $Iapi["table"] = $table;
        $Iapi["dates"] = $dates;
        $Iapi["data"] = $data;
        $Iapi["sql"] = $sql;
        $Iapi["type"] = "success";
        $Iapi["message"] = "success";
        return $Iapi;
    }

    public function getDates($location)
    {
        $Iapi = $this->Iapi;

        $where = " WHERE `location` = \"$location\"";
        $sql = "SELECT dateTime FROM `visitters`" . ($location == "all" ? "" : $where);
        $data = $this->db->getData($sql);

        if ($data != false) for ($i = 0; $i < count($data); $i++) {
            $data[$i] = substr($data[$i]["dateTime"], 0, 10);
        }
        else if ($data == false) {
            $data = ["no dates"];
        }
        
        $data&&$data = array_unique($data);

        $Iapi["type"] = "success";
        $Iapi["message"] = "success";
        $Iapi["dates"] = $data;
        return $Iapi;
    }
}
