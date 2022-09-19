<?php

/**
 * @OA\Get(
 *      path="/games",
 *      tags={"games"},
 *      summary="Retrurn all games from the API. ",
 *      @OA\Response(
 *          response=200,
 *          description="List of all games in the database."
 *      )
 * )
 */

// get all
Flight::route('GET /games', function(){
    $data = Flight::gameService()->get_all();
    Flight::json($data);
    // print_r($users);
});


/**
 * @OA\Get(path="/games/{id}", tags={"games"}, 
 *     summary="Get one game from the database.",  
 *     @OA\Parameter(in="path", name="id", example=29, description="ID of game"),
 *     @OA\Response(response="200", description="Get one game from the database with additional infomation"),
 *     @OA\Response(response="404", description="Game not found")
 * )
 */


//get one
Flight::route('GET /games/@id', function($id){
    $data = Flight::gameService()->get_by_id_with_category($id);
    Flight::json($data);
});


/**
* @OA\Post(
*     path="/games", security={{"ApiKeyAuth": {}}},
*     description="Add game from admin panel.",
*     tags={"games"},
*     summary="Add game from admin panel.",  
*     @OA\RequestBody(description="Game info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="name", type="string", example="Igrica",	description="Game name"),
*    				@OA\Property(property="category_id", type="integer", example="22",	description="Category ID" ),
*    				@OA\Property(property="description", type="string", example="Opis igre",	description="Description" ),
*    				@OA\Property(property="image", type="string", example="slika.jpg",	description="Image path" ),
*    				@OA\Property(property="icon", type="string", example="ikona.jpg",	description="Icon path(Can be null)" ),
*           
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="Game has been added to the database"
*     ),
*     @OA\Response(
*         response=500,
*         description="Internal server error"
*     ),
* )
*/

// Add new game from admin panel
Flight::route('POST /games', function(){
    $request = Flight::request();
    $data = $request->data->getData();
    // Flight::dao()->add($data['user_name'], $data['user_mail'], $data['user_password']);
    $podaci = Flight::gameService()->add($data);
    Flight::json(["message" => "Game added successfully"]);

});


/**
* @OA\Put(
*     path="/games/{id}", security={{"ApiKeyAuth": {}}},
*     description="Update game info from admin panel.",
*     tags={"games"},
*     summary="Update game info from admin panel.", 
*     @OA\Parameter(in="path", name="id", example=37, description="Game ID"),
*     @OA\RequestBody(description="Game information", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="name", type="string", example="Igrica",	description="Game name"),
*    				@OA\Property(property="category_id", type="integer", example="37",	description="Category ID" ),
*    				@OA\Property(property="description", type="string", example="Opis igre",	description="Description" ),
*    				@OA\Property(property="image", type="string", example="slika.jpg",	description="Image path" ),
*    				@OA\Property(property="icon", type="string", example="ikona.jpg",	description="Icon path(Can be null)" ),
*          
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="Game has been updated"
*     ),
*     @OA\Response(
*         response=500,
*         description="Internal server error"
*     )
* )
*/

// update from admin panel
Flight::route('PUT /games/@id', function($id){
    $request = Flight::request();
    $data = $request->data->getData();
    // Flight::dao()->update($id, $data['user_name'], $data['user_mail'], $data['user_password']);
    // $data['id'] = $id;
    Flight::gameService()->update($id, $data);
    Flight::json(["message" => "Game updated successfully"], 200);

});

/**
* @OA\Delete(
*     path="/deletegames/{id}", security={{"ApiKeyAuth": {}}},
*     description="Delete game from admin panel",
*     tags={"games"},
*     summary="Delete game from admin panel.", 
*     @OA\Parameter(in="path", name="id", example=38, description="Game ID"),
*     @OA\Response(
*         response=200,
*         description="Game deleted"
*     ),
*     @OA\Response(
*         response=404,
*         description="Game not found"
*     )
* )
*/

// delete from admin panel
Flight::route('DELETE /deletegames/@id', function($id){
    Flight::gameService()->delete($id);
    Flight::json(["message"=>"deleted"], 200);
});


/**
 * @OA\Get(
 *      path="/toprated",
 *      tags={"games"},
 *      summary="Retrurn 6 of the highest rated games from the API. ",
 *      @OA\Response(
 *          response=200,
 *          description="List of the top 6 hightst rated games."
 *      )
 * )
 */

// get highest rated
Flight::route('GET /toprated', function(){
    $data = Flight::gameService()->get_highest_rated_games();
    print_r($data);
    Flight::json($data, 200);
});

// get all games name
Flight::route('GET /allnames', function(){
    $data = Flight::gameService()->get_all_games_by_name();
    print_r($data);
    Flight::json($data, 200);
});


/**
* @OA\Post(
*     path="/games-search",
*     description="Search for games.",
*     tags={"games"},
*     summary="Search games.",  
*     @OA\RequestBody(description="Game name", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="search", type="string", example="red",	description="Game name"), 
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="Game that has been searched"
*     ),
* )
*/


// search games
Flight::route('POST /games-search', function(){
    $request = Flight::request();
    $name = $request->data->getData();
    if (strlen($name['search']) >= 1){
        $data = Flight::gameService()->get_game_by_name($name['search']);
        Flight::json($data, 200);
    }
    else{
        Flight::json(Flight::gameService()->get_all(), 200);
    }
    
});

?>