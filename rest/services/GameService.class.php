<?php

require_once __DIR__.'/../dao/GameDao.class.php';
require_once __DIR__.'/BaseService.class.php';

class GameService extends BaseService{ 

    private $dao;

    public function __construct(){
        parent::__construct(new GameDao());
    }

}
?>