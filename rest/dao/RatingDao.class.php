<?php

require_once __DIR__.'/BaseDao.class.php';

class RatingDao extends BaseDao{

    public function __construct(){
        parent::__construct("rating");
    }    
    public function get_reviews_by_game_id($game_id){
        return $this->query("SELECT u.username as username, r.comment as comment, (gameplay_rating + performance_rating + graphics_rating + audio_rating + satisfaction_rating) / 5 as total_rating_by_post
                            FROM rating r
                            join user u 
                                on u.id = r.user_id
                            where game_id = :game_id", ['game_id' => $game_id]); 
    }
    public function get_total_rating_by_post_id($id){
        return $this->query("SELECT (gameplay_rating + performance_rating + graphics_rating + audio_rating + satisfaction_rating) / 5 as total_rating_by_post
                            FROM rating
                            WHERE id = :id", ['id' => $id]);
    }
}
?>