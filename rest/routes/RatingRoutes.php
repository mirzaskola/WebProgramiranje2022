<?php

// get all reviews
Flight::route('GET /reviews', function(){
    $data = Flight::ratingService()->get_all();
    Flight::json($data);
});

//get one review for game
Flight::route('GET /reviews/@id', function($id){
    $data = Flight::ratingService()->get_reviews_by_game_id($id);
    Flight::json($data);
});

// Leave a review
Flight::route('POST /review', function(){
    $request = Flight::request();
    $data = $request->data->getData();
    $user = Flight::get('user');

    $data['user_id'] = $user['id'];
    // Flight::dao()->add($data['user_name'], $data['user_mail'], $data['user_password']);
    $podaci = Flight::ratingService()->add($data);
    Flight::json($podaci);
});

// Update review
Flight::route('PUT /review/@id', function($id){
    $request = Flight::request();
    $data = $request->data->getData();
    // Flight::dao()->update($id, $data['user_name'], $data['user_mail'], $data['user_password']);
    // $data['id'] = $id;
    Flight::ratingService()->update($id, $data);
    Flight::json($data);

});

?>