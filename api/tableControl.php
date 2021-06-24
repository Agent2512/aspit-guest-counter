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
        $where = "WHERE " . $location .($date!=""?" && $date":"");


        // $date = $format == "year" ? "`dateTime` REGEXP  \"$_date\"" : "`dateTime` = \"$_date\"";
        // $where = $location != "" ? join(" && ", [$location, $date]) : $date;





        // $sql = "SELECT `guests`,`students` FROM `visitters`";
        // $data = $this->db->getData($sql);
        $Iapi["location"] = $location;
        $Iapi["date"] = $date;
        $Iapi["test"] = $where;
        return $Iapi;
    }

    public function getDates($format)
    {
        $Iapi = $this->Iapi;

        $sql = "SELECT dateTime FROM `visitters`";
        $data = $this->db->getData($sql);

        if ($format == "day") {
            $Iapi["type"] = "success";
            $Iapi["message"] = "success";

            for ($i = 0; $i < sizeof($data); $i++) {
                $data[$i] = $data[$i]["dateTime"];
            }

            $Iapi["dates"] = $data;
            return $Iapi;
        } else if ($format == "year") {
            $Iapi["type"] = "success";
            $Iapi["message"] = "success";

            for ($i = 0; $i < sizeof($data); $i++) {
                $data[$i] = date("Y", strtotime($data[$i]["dateTime"]));
            }
            $data = array_unique($data);

            $Iapi["dates"] = $data;
            return $Iapi;
        } else {
            return $Iapi;
        }
    }
}
