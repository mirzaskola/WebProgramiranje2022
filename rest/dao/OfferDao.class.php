<?php

require_once __DIR__.'/BaseDao.class.php';

class OfferDao extends BaseDao{

    public function __construct(){
        parent::__construct("offer");  
    }

}
?>