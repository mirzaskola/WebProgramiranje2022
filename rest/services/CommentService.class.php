<?php

require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/CommentDao.class.php';


class CommentService extends BaseService{ 

    public function __construct(){
        parent::__construct(new CommentDao());
    }

    

    public function get_by_game_id($id){
        return $this->dao->get_by_game_id($id);
    }

}
?>