<?php

require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/UserDao.class.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class UserService extends BaseService{ 

    public function __construct(){
        parent::__construct(new UserDao());
    }
    public function get_user_by_email($email){
        return $this->dao->get_user_by_email($email);
    }
    public function login($login_data){
    
        $user = $this->dao->get_user_by_email($login_data['email']);
        if (isset($user['id'])){
            if($user['password'] == md5($login_data['password'])){
                unset($user['password']);
                $jwt = JWT::encode($user, Config::JWT_SECRET(), 'HS256');
                return (['message' => $jwt, 'code' => 200]);
            }else{
                return (['message' => "Wrong password", 'code' => 404]);
            }
        }else{
            return (['message' => "User doesn't exist", 'code' => 404]);
        }
    }
    public function check_user_role($user){
        $user_from_db = $this->dao->get_user_by_email($user['email']);
        if($user_from_db['user_role'] == 1){
            return TRUE;
        }
        else{
            return FALSE;
        }
    }
}

?>