<?php

require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/RatingDao.class.php';


class RatingService extends BaseService{ 

    public function __construct(){
        parent::__construct(new RatingDao());
    }

}
?>