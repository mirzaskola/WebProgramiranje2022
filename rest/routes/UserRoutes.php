<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


// get all users for admin
Flight::route('GET /users', function(){
    $data = Flight::userService()->get_all();
    Flight::json($data);
});

// get one user for admin
Flight::route('GET /users/@id', function($id){
    $data = Flight::userService()->get_by_id($id);
    unset($data['password']);
    Flight::json($data);
});

// get my profile info
Flight::route('GET /myprofile', function(){
    $user = Flight::get('user');
    $data = Flight::userService()->get_by_id($user['id']);
    unset($data['password']);
    Flight::json($data);
});


// insert from admin panel
Flight::route('POST /users', function(){
    $request = Flight::request();
    $data = $request->data->getData();
    $data['password'] = md5($data['password']);
    // Flight::dao()->add($data['user_name'], $data['user_mail'], $data['user_password']);
    $podaci = Flight::userService()->add($data);
    Flight::json($podaci);

});

// update for admin panel
Flight::route('PUT /users/@id', function($id){
    $request = Flight::request();
    $data = $request->data->getData();
    $data['password'] = md5($data['password']);
    // Flight::dao()->update($id, $data['user_name'], $data['user_mail'], $data['user_password']);
    // $data['id'] = $id;
    Flight::userService()->update($id, $data);
    Flight::json($data);

});

// delete
Flight::route('DELETE /deleteusers/@id', function($id){
    Flight::userService()->delete($id);
    Flight::json(["message"=>"deleted"]);
});

// Log in user
Flight::route('POST /login', function(){
    $login_data = Flight::request()->data->getData();
    $response = Flight::userService()->login($login_data);
    if(isset($response['token'])){
        Flight::json($response['token']); 
    }
    else{
        Flight::json(["message" => $response['message']], $response['code']);
    }
});

// Register user
Flight::route('POST /signup', function(){
    $sign_up_data = Flight::request()->data->getData();
    $sign_up_data['password'] = md5($sign_up_data['password']);
    $sign_up_data['user_role'] = 0;
    Flight::json(Flight::userService()->add($sign_up_data));
});

// Check user role
Flight::route('GET /admin', function(){
    $user = Flight::get('user');
    Flight::json(Flight::userService()->check_user_role($user));
});

?>