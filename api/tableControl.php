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
        $date = $_format == "year" ? "" : "`dateTime` = \"$_date\"";
        $where = "WHERE " . $location . " && " . $date;
        if ($location == "" && $date == "") {
            $where = "";
        } else if ($location == "" || $date == "") {
            $where = str_replace(" && ", "", $where);
        }

        $sql = "SELECT * FROM `visitters` $where";
        $data = $this->db->getData($sql);

        $Iapi["type"] = "success";
        $Iapi["message"] = "success";

        if ($_format == "year") {
            $table = [];
            $years = [];

            for ($i = 0; $i < count($data); $i++) {
                $e = $data[$i];
                $year = date("Y", strtotime($e["dateTime"]));

                if (in_array($year, $years) == false) {
                    array_push($years, $year);
                }

                $index = array_search($year, $years);
                $isTable = isset($table[$index])?$table[$index]:false;
                
                if($isTable == false) {
                    array_push($table, [
                        "date" => $year,
                        "guests" => intval($e["guests"]),
                        "students" => intval($e["students"]),
                    ]);
                } 
                else {
                    $table[$index]["guests"] += intval($e["guests"]);
                    $table[$index]["students"] += intval($e["students"]);
                }
            }
            $Iapi["table"] = $table;
            return $Iapi;
        }



        $Iapi["table"] = $data;
        return $Iapi;
    }

    public function getDates($location)
    {
        $Iapi = $this->Iapi;

        $where = " WHERE `location` = \"$location\"";
        $sql = "SELECT dateTime FROM `visitters`" . ($location == "all" ? "" : $where);
        $data = $this->db->getData($sql);

        if ($data != false) for ($i = 0; $i < count($data); $i++) {
            $data[$i] = $data[$i]["dateTime"];
        }
        else if ($data == false) {
            $data = ["no dates"];
        }

        $Iapi["type"] = "success";
        $Iapi["message"] = "success";
        $Iapi["dates"] = $data;
        return $Iapi;
    }
}
