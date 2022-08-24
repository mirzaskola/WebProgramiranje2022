<?php

// get all
Flight::route('GET /offers', function(){
    $data = Flight::offerService()->get_all();
    Flight::json($data);
    // print_r($users);
});

//get one
Flight::route('GET /offers/@id', function($id){
    $data = Flight::offerService()->get_by_id($id);
    Flight::json($data);
});

// update
Flight::route('PUT /offers/@id', function($id){
    $request = Flight::request();
    $data = $request->data->getData();
    Flight::offerService()->update($id, $data);
    Flight::json($data);

});

// insert
Flight::route('POST /offers', function(){
    $request = Flight::request();
    $data = $request->data->getData();
    $result = Flight::offerService()->add($data);
    Flight::json($result);

});

// delete
Flight::route('DELETE /offers/@id', function($id){
    Flight::offerService()->delete($id);
});

?>