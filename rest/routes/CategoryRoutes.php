<?php

// get all
Flight::route('GET /categories', function(){
    $data = Flight::categoryService()->get_all();
    Flight::json($data);
    // print_r($users);
});

// get one
Flight::route('GET /categories/@id', function($id){
    $data = Flight::categoryService()->get_by_id($id);
    Flight::json($data);
});

// update
Flight::route('PUT /categories/@id', function($id){
    $request = Flight::request();
    $data = $request->data->getData();
    Flight::categoryService()->update($id, $data);
    Flight::json($data);

});

// insert
Flight::route('POST /categories', function(){
    $request = Flight::request();
    $data = $request->data->getData();
    $result = Flight::categoryService()->add($data);
    Flight::json($result);

});

// delete
Flight::route('DELETE /categories/@id', function($id){
    Flight::categoryService()->delete($id);
});

?>