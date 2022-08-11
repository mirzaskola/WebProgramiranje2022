<?php


// get all
Flight::route('GET /users', function(){
    $data = Flight::userService()->get_all();
    Flight::json($data);
});

//get one
Flight::route('GET /users/@id', function($id){
    $data = Flight::userService()->get_by_id($id);
    Flight::json($data);
});

// update
Flight::route('PUT /users/@id', function($id){
    $request = Flight::request();
    $data = $request->data->getData();
    Flight::userService()->update($id, $data);
    Flight::json($data);

});

// insert
Flight::route('POST /users', function(){
    $request = Flight::request();
    $data = $request->data->getData();
    $podaci = Flight::userService()->add($data);
    Flight::json($podaci);

});

// delete
Flight::route('DELETE /users/@id', function($id){
    Flight::userService()->delete($id);
});

?>