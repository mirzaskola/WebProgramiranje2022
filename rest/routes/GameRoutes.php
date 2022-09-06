<?php

// get all
Flight::route('GET /games', function(){
    $data = Flight::gameService()->get_all();
    Flight::json($data);
    // print_r($users);
});

//get one
Flight::route('GET /games/@id', function($id){
    $data = Flight::gameService()->get_by_id($id);
    Flight::json($data);
});

// insert
Flight::route('POST /games', function(){
    $request = Flight::request();
    $data = $request->data->getData();
    // Flight::dao()->add($data['user_name'], $data['user_mail'], $data['user_password']);
    $podaci = Flight::gameService()->add($data);
    Flight::json($podaci);

});

// update for admin panel
Flight::route('PUT /games/@id', function($id){
    $request = Flight::request();
    $data = $request->data->getData();
    // Flight::dao()->update($id, $data['user_name'], $data['user_mail'], $data['user_password']);
    // $data['id'] = $id;
    Flight::gameService()->update($id, $data);
    Flight::json($data);

});

// delete
Flight::route('DELETE /deletegames/@id', function($id){
    Flight::gameService()->delete($id);
    Flight::json(["message"=>"deleted"]);
});

// get highest rated
Flight::route('GET /toprated', function(){
    $data = Flight::gameService()->get_highest_rated_games();
    print_r($data);
    Flight::json($data);
});

// get all games name
Flight::route('GET /allnames', function(){
    $data = Flight::gameService()->get_all_games_by_name();
    print_r($data);
    Flight::json($data);
});

// search games
Flight::route('POST /games-search', function(){
    $request = Flight::request();
    $name = $request->data->getData();
    $data = Flight::gameService()->get_game_by_name($name);
    Flight::json($data);
});

?>