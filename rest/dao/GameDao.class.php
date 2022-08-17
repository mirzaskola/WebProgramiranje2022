<?php

require_once __DIR__.'/BaseDao.class.php';

class GameDao extends BaseDao{

    public function __construct(){
        parent::__construct("game");  
    }
    public function get_game_by_name($name){
        return $this->query("SELECT * FROM game WHERE name LIKE '%':name'%'", ['name' => $name]);
    }
    public function get_highest_rated_games(){
        return $this->query_no_param("select g.name, AVG(r.gameplay_rating) as gameplay, AVG(r.performance_rating) as performance, AVG(r.graphics_rating) as graphics, AVG(r.audio_rating) as audio, AVG(r.satisfaction_rating) as satisfaction, (AVG(r.gameplay_rating) + AVG(r.performance_rating) + AVG(r.graphics_rating) + AVG(r.audio_rating) + AVG(r.satisfaction_rating)) / 5 as total_rating 
        from game g
        join rating r
            on r.game_id = g.id
        group by g.name
        order by total_rating desc
        limit 6");
    }
    
}
?>