<?php

require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/RatingDao.class.php';


class RatingService extends BaseService{ 

    public function __construct(){
        parent::__construct(new RatingDao());
    }
    public function get_total_rating_by_post($id){

        $normalni_rezultati = array_values($this->dao->get_by_id($id));

        $sabrani_rejtinzi = 0;

        for($i = 1; $i < count($normalni_rezultati) - 2; $i++){
            $sabrani_rejtinzi = $sabrani_rejtinzi + $normalni_rezultati[$i];
        }
        return $sabrani_rejtinzi / 5;
    
    } 
    public function get_reviews_by_game_id($game_id){
        return $this->dao->get_reviews_by_game_id($game_id); 
    }
}
?>