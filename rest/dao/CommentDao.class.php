<?php

require_once __DIR__.'/BaseDao.class.php';

class CommentDao extends BaseDao{

    public function __construct(){
        parent::__construct("comment");
    }    

    public function get_by_game_id($game_id){
        return $this->query("SELECT * FROM comment WHERE game_id =:game_id", ['game_id' => $game_id]);
    }

    public function get_by_user_id($user_id){
        return $this->query("SELECT * FROM comment WHERE user_id =:user_id", ['user_id' => $user_id]);
    }

    public function get_by_user_username($user_usermame){
        return $this->query("SELECT * FROM comment WHERE user_usermame =:user_usermame", ['user_usermame' => $user_id]);
    }

}
?>