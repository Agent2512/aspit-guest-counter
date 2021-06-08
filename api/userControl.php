<?php
require("dbConnect.php");
$Iapi;
$Iapi["type"] = "error";
$Iapi["message"] = "error";
class userControl {
    private $db;
    public function __construct() {
        $this->db = new dbConnect();
    }

    public function login() {
    }

    /** 
     * @param string $username
     * @param string $password
    */
    public function signup($username,$password)
    {
        global $Iapi;
        $ifUser = $this->getUser($username);
        
        $Iapi["message"] = "success";
        $Iapi["var"] = $ifUser;

        return $Iapi;
    }

    public function auth()
    {
        
    }

    /**
     * @param string $username
     * @return object returns user object
     */
    private function getUser($username)
    {
        return $this->db->getData("SELECT * FROM `users`")[0];
    }
}