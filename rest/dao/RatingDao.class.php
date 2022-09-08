<?php

require_once __DIR__.'/BaseDao.class.php';

class RatingDao extends BaseDao{

    public function __construct(){
        parent::__construct("rating");
    }    
    public function get_reviews_by_game_id($game_id){
        return $this->query("SELECT u.username as username, r.comment as comment
                            FROM rating r
                            join user u 
                                on u.id = r.user_id
                            where game_id = :game_id", ['game_id' => $game_id]); 
    }
}
?>