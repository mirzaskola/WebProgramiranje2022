<?php

require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/OfferDao.class.php';


class OfferService extends BaseService{ 

    public function __construct(){
        parent::__construct(new OfferDao());
    }
    
    
}
?>