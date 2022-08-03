<?php

require_once '../vendor/autoload.php';
require_once 'dao/UserDao.class.php';

Flight::register('dao', 'UserDao');


// get all
Flight::route('GET /users', function(){
    $users = Flight::dao()->get_all();
    Flight::json($users);
    // print_r($users);
});

//get one
Flight::route('GET /users/@id', function($id){
    $users = Flight::dao()->get_by_id($id);
    Flight::json($users);
});

// update
Flight::route('PUT /users/@id', function($id){
    $request = Flight::request();
    $data = $request->data->getData();
    // Flight::dao()->update($id, $data['user_name'], $data['user_mail'], $data['user_password']);
    $data['id'] = $id;
    Flight::dao()->update($data);
    Flight::json($data);

});

// insert
Flight::route('POST /users', function(){
    $request = Flight::request();
    $data = $request->data->getData();
    // Flight::dao()->add($data['user_name'], $data['user_mail'], $data['user_password']);
    $podaci = Flight::dao()->add($data);
    Flight::json($podaci);

});


// delete
Flight::route('DELETE /users/@id', function($id){
    Flight::dao()->delete($id);
});

// Flight::route('/', function(){
//     echo "Hello world";
// });
// Flight::route('/dorian', function(){
//     echo "Hello dugin";
// });
// Flight::route('/tin/@name', function($name){
//     echo "Hello $name";
// });


Flight::start();
?>