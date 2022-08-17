<?php

require_once __DIR__.'/BaseDao.class.php';

class RatingDao extends BaseDao{

    public function __construct(){
        parent::__construct("rating");
    }    
    
}
?>