<?php

// get all reviews admin
Flight::route('GET /reviews', function(){
    $data = Flight::ratingService()->get_all_with_game_and_user_info();
    Flight::json($data);
});

// get reviews for one game
Flight::route('GET /reviews/@id', function($id){
    $data = Flight::ratingService()->get_reviews_by_game_id($id);
    Flight::json($data);
});

// get recent user activivites admin
Flight::route('GET /recentactivities', function(){
    $data = Flight::ratingService()->get_recent_user_activities();
    Flight::json($data);
});

// get reviews for my profile
Flight::route('GET /mojirivjui', function(){
    $user = Flight::get('user');
    $data = Flight::ratingService()->get_reviews_by_user_id($user['id']);
    Flight::json($data);
});

// get one review for my profile
Flight::route('GET /mojirivjui/@id', function($id){
    $data = Flight::ratingService()->get_by_id_with_game_info($id);
    Flight::json($data);
});

// Update from my profile review
Flight::route('PUT /mojirivjui/@id', function($id){
    $request = Flight::request();
    $data = $request->data->getData();
    // Flight::dao()->update($id, $data['user_name'], $data['user_mail'], $data['user_password']);
    // $data['id'] = $id;
    Flight::ratingService()->update($id, $data);
    Flight::json($data);
});

// delete review from my profile
Flight::route('DELETE /deletemojirivjui/@id', function($id){
    Flight::ratingService()->delete($id);
    Flight::json(["message"=>"deleted"]);
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


?>