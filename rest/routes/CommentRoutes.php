<?php

//get one
Flight::route('GET /comments/@id', function($id){
    $data = Flight::commentService()->get_by_game_id($id);
    Flight::json($data);
});



?>