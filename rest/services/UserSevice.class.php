<?php

require_once __DIR__.'/../dao/UserDao.class.php';
require_once __DIR__.'/BaseService.class.php';

class UserService extends BaseService{ 

    private $dao;

    public function __construct(){
        parent::__construct(new UserDao());
    }

}

?>