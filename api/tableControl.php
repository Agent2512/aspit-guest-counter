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

    public function get()
    {
    }
}
