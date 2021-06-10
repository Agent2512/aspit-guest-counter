<?php
require("dbConnect.php");
require("JWT.php");
use Firebase\JWT\JWT;

class userControl
{
    private $db;
    /**@var string[] $Iapi */
    private $Iapi;
    /**@var string $JWT_secret */
    private $JWT_secret;

    public function __construct()
    {
        $this->db = new dbConnect();

        $this->Iapi["type"] = "error";
        $this->Iapi["message"] = "error";

        $this->JWT_secret = "gfjjg88344jnnbvgglsdfj57gdsdf55f7";
    }
    /** 
     * @param string $username
     * @param string $password
     */
    public function login($username, $password)
    {
        $Iapi = $this->Iapi;
        $Iapi["message"] = "incorrect fields";

        $ifUser = $this->getUser($username);

        if ($ifUser) {
            if (!password_verify($password, $ifUser["password"])) return $Iapi;
            $Iapi["type"] = "success";
            $Iapi["message"] = "success";

            $issuedAt = time();
            $expire = $issuedAt + 60 * 60 * 5; // 5hours 

            $data = [
                'iat'  => $issuedAt,        
                'exp'  => $expire,                    
                'username' => $ifUser["username"],
                'userid' => $ifUser["id"],
                'isAdmin' => $ifUser["isAdmin"]?true:false                  
            ];

            $token = JWT::encode(
                $data,
                $this->JWT_secret,
                "HS512"
            );


            $Iapi["jwt"] = $token;

            return $Iapi;
        }

        return $Iapi;
    }

    /** 
     * @param string $username
     * @param string $password
     */
    public function signup($username, $password)
    {
        $Iapi = $this->Iapi;

        $ifUser = $this->getUser($username);

        if ($ifUser == false) {
            $passwordHash = password_hash($password, PASSWORD_BCRYPT);

            $bool = $this->db->createData("INSERT INTO `users` (`username`, `password`) VALUES (\"$username\", \"$passwordHash\")");

            if ($bool) {
                $Iapi["type"] = "success";
                $Iapi["message"] = "user is registered";
                return $Iapi;
            } else return $Iapi;
        } else {
            $Iapi["type"] = "error";
            $Iapi["message"] = "user is already registered";
            return $Iapi;
        }

        return $Iapi;
    }

    /**
     * @param string $token is a JWT string
     * @return object returns user object or false
     */
    public function auth($token)
    {
        $Iapi = $this->Iapi;

        try {
            $de_token = JWT::decode($token, $this->JWT_secret,array("HS512"));
            $ifUser = $this->getUser($de_token->username);
            if ($ifUser == false) return $Iapi;
            $Iapi["type"] = "success";
            $Iapi["message"] = "success";

            $Iapi["token"] = $de_token;
            return $Iapi;
        } catch (\Throwable $th) {}

        return $Iapi;
    }

    /**
     * @param string $username
     * @return object returns user object or false
     */
    private function getUser($username)
    {
        $user = $this->db->getData("SELECT * FROM `users` WHERE username = \"$username\"")[0];
        return $user ? $user : false;
    }
}
