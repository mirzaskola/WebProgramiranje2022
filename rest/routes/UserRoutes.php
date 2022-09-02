<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

Flight::route('POST /login', function(){
    $login_data = Flight::request()->data->getData();
    Flight::json(Flight::userService()->login($login_data));
});
Flight::route('GET /admin', function(){
    $user = Flight::get('user');
    Flight::json(Flight::userService()->check_user_role($user));
});

?>