<?php

require_once __DIR__.'/BaseDao.class.php';

class RatingDao extends BaseDao{

    public function __construct(){
        parent::__construct("rating");
    }    
    public function get_all_with_game_and_user_info(){
        return $this->query_no_param("SELECT u.username as username, r.comment as comment, (gameplay_rating + performance_rating + graphics_rating + audio_rating + satisfaction_rating) / 5 as total_rating_by_post, r.game_id as game_id, g.name as name, r.id as review_id, created
                            from rating r
                            join game g
                                on g.id = r.game_id
                            join user u
                                on u.id = r.user_id"); 
    }
    public function get_reviews_by_game_id($game_id){
        return $this->query("SELECT u.username as username, r.comment as comment, (gameplay_rating + performance_rating + graphics_rating + audio_rating + satisfaction_rating) / 5 as total_rating_by_post, created
                            FROM rating r
                            join user u 
                                on u.id = r.user_id
                            where game_id = :game_id", ['game_id' => $game_id]); 
    }
    public function get_recent_user_activities(){
        return $this->query_no_param("SELECT u.username as username, r.comment as comment, (gameplay_rating + performance_rating + graphics_rating + audio_rating + satisfaction_rating) / 5 as total_rating_by_post, r.game_id as game_id, g.name as name, r.id as review_id, created
                                    from rating r
                                    join game g
                                        on g.id = r.game_id
                                    join user u
                                        on u.id = r.user_id
                                    order by created DESC
                                    limit 5");
    }
    public function get_total_rating_by_post_id($id){
        return $this->query("SELECT (gameplay_rating + performance_rating + graphics_rating + audio_rating + satisfaction_rating) / 5 as total_rating_by_post
                            FROM rating
                            WHERE id = :id", ['id' => $id]);
    }
    public function get_reviews_by_user_id($user_id){
        return $this->query("SELECT u.username as username, r.comment as comment, (gameplay_rating + performance_rating + graphics_rating + audio_rating + satisfaction_rating) / 5 as total_rating_by_post, r.game_id as game_id, g.name as name, r.id as review_id, created
                            FROM rating r
                            join user u 
                                on u.id = r.user_id
                            join game g
                                on g.id = r.game_id
                            where user_id = :user_id", ['user_id' => $user_id]);
    }
    public function get_by_id_with_game_info($id){
        return $this->query_unique("SELECT r.id as id, gameplay_rating, performance_rating, graphics_rating, audio_rating, satisfaction_rating, user_id, game_id, g.name as name, comment, created 
                                    from rating r
                                    join game g
                                        on g.id = r.game_id
                                    where r.id = :id", ['id' => $id]);
    }
    
}
?>