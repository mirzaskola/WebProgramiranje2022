<?php

require_once __DIR__.'/BaseDao.php';

class GameDao extends BaseDao{

    public function __construct(){
        parent::__construct("game");  
    }
    
}
?>