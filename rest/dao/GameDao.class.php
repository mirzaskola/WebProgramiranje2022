<?php

require_once __DIR__.'/BaseDao.class.php';

class GameDao extends BaseDao{

    public function __construct(){
        parent::__construct("game");  
    }
    public function get_game_by_name($name){
        return $this->query_no_param("SELECT * FROM game WHERE lower(name) LIKE '%".strtolower($name)."%'");
    }
    public function get_all_games_by_name(){
        return $this->query_no_param("SELECT name FROM game");
    }


    public function get_highest_rated_games(){
        return $this->query_no_param(
            "SELECT g.id, g.name, g.image, AVG(r.gameplay_rating) as gameplay, AVG(r.performance_rating) as performance,
                AVG(r.graphics_rating) as graphics, AVG(r.audio_rating) as audio, AVG(r.satisfaction_rating) as satisfaction,
                    (AVG(r.gameplay_rating) + AVG(r.performance_rating) + AVG(r.graphics_rating) + AVG(r.audio_rating) + AVG(r.satisfaction_rating)) / 5 as total_rating 
            FROM game g
            JOIN rating r
                ON r.game_id = g.id
            GROUP BY g.name, g.id
            ORDER BY total_rating DESC
            LIMIT 6"
            );
        }
   
}
?>