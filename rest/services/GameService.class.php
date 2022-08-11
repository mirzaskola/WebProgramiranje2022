<?php

require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/GameDao.class.php';


class GameService extends BaseService{ 

    public function __construct(){
        parent::__construct(new GameDao());
    }

}
?>