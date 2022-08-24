<?php

require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/GameDao.class.php';


class GameService extends BaseService{ 

    public function __construct(){
        parent::__construct(new GameDao());
    }
    public function get_game_by_name($name){
        return $this->dao->get_game_by_name($name);
    }
    public function get_highest_rated_games(){
        return $this->dao->get_highest_rated_games();
    }

    public function get_all_games_by_name(){
        return $this->dao->get_all_games_by_name();
    }
    
}
?>