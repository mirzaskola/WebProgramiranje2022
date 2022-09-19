<?php

/**
 * @OA\Get(
 *      path="/reviews",
 *      security={{"ApiKeyAuth": {}}},
 *      tags={"reviews"}, 
 *      summary="Retrurn all reviews from the API. ",
 *      @OA\Response(
 *          response=200,
 *          description="List of all reviews form the database."
 *      )
 * )
 */

// get all reviews admin
Flight::route('GET /reviews', function(){
    $data = Flight::ratingService()->get_all_with_game_and_user_info();
    Flight::json($data, 200);
});


/**
 * @OA\Get(path="/reviews/{id}", tags={"reviews"},
 *     summary="Get reviews for one game.",  
 *     @OA\Parameter(in="path", name="id", example=32, description="ID of game"),
 *     @OA\Response(response="200", description="Reviews for one game"),
 *     @OA\Response(response="404", description="Reviews not found")
 * )
 */


// get reviews for one game
Flight::route('GET /reviews/@id', function($id){
    $data = Flight::ratingService()->get_reviews_by_game_id($id);
    Flight::json($data);
});


/**
 * @OA\Get(
 *      path="/recentactivities", security={{"ApiKeyAuth": {}}},
 *      tags={"reviews"},
 *      summary="Retrurn 5 most recent user posts.",
 *      @OA\Response(
 *          response=200,
 *          description="List of 5 most recent user posts."
 *      )
 * )
 */

// get recent user activivites admin
Flight::route('GET /recentactivities', function(){
    $data = Flight::ratingService()->get_recent_user_activities();
    Flight::json($data);
});


/**
 * @OA\Get(
 *      path="/mojirivjui", security={{"ApiKeyAuth": {}}},
 *      tags={"reviews"},
 *      summary="List of reviews made by the user for my profile.",
 *      @OA\Response(
 *          response=200,
 *          description="List of reviews left by the user."
 *      )
 * )
 */

// get reviews for my profile
Flight::route('GET /mojirivjui', function(){
    $user = Flight::get('user');
    $data = Flight::ratingService()->get_reviews_by_user_id($user['id']);
    Flight::json($data);
});



/**
 * @OA\Get(path="/mojirivjui/{id}", tags={"reviews"}, security={{"ApiKeyAuth": {}}},
 *     summary="Get one review for my profile.",  
 *     @OA\Parameter(in="path", name="id", example=32, description="ID of review"),
 *     @OA\Response(response="200", description="One review made by the user"),
 *     @OA\Response(response="404", description="Review not found")
 * )
 */

// get one review for my profile
Flight::route('GET /mojirivjui/@id', function($id){
    $data = Flight::ratingService()->get_by_id_with_game_info($id);
    Flight::json($data);
});


/**
* @OA\Put(
*     path="/mojirivjui/{id}", security={{"ApiKeyAuth": {}}},
*     description="Update review from my profile.",
*     tags={"reviews"},
*     summary="Update review from my profile.", 
*     @OA\Parameter(in="path", name="id", example=34, description="review ID"),
*     @OA\RequestBody(description="Review components", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="gameplay_rating", type="integer", example="100",	description="Gameplay"),
*    				@OA\Property(property="performance_rating", type="integer", example="100",	description="Performance" ),
*    				@OA\Property(property="graphics_rating", type="integer", example="100",	description="Graphics" ),
*    				@OA\Property(property="audio_rating", type="integer", example="100",	description="Audio" ),
*    				@OA\Property(property="satisfaction_rating", type="integer", example="100",	description="Satisfaction" ),
*    				@OA\Property(property="comment", type="string", example="Poprilicno guba",	description="Comment" ),
*          
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="Review has been updated"
*     ),
*     @OA\Response(
*         response=500,
*         description="Internal server error"
*     )
* )
*/

// Update from my profile review
Flight::route('PUT /mojirivjui/@id', function($id){
    $request = Flight::request();
    $data = $request->data->getData();
    // Flight::dao()->update($id, $data['user_name'], $data['user_mail'], $data['user_password']);
    // $data['id'] = $id;
    Flight::ratingService()->update($id, $data);
    Flight::json(["message" => "Review has been updated"]);
});


/**
* @OA\Delete(
*     path="/deletemojirivjui/{id}", security={{"ApiKeyAuth": {}}},
*     description="Delete review from my profile",
*     tags={"reviews"},
*     summary="Delete review from my profile.", 
*     @OA\Parameter(in="path", name="id", example=40, description="Review ID"),
*     @OA\Response(
*         response=200,
*         description="Review deleted successfully"
*     ),
* )
*/

// delete review from my profile
Flight::route('DELETE /deletemojirivjui/@id', function($id){
    Flight::ratingService()->delete($id);
    Flight::json(["message" => "deleted"]);
});


/**
* @OA\Delete(
*     path="/deletereview/{id}", security={{"ApiKeyAuth": {}}},
*     description="Delete review from admin panel",
*     tags={"reviews"},
*     summary="Delete review from admin panel.", 
*     @OA\Parameter(in="path", name="id", example=40, description="Review ID"),
*     @OA\Response(
*         response=200,
*         description="Review deleted successfully"
*     ),
* )
*/

// delete review from admin panel
Flight::route('DELETE /deletereview/@id', function($id){
    Flight::ratingService()->delete($id);
    Flight::json(["message" => "deleted"]);
});



/**
* @OA\Post(
*     path="/review", security={{"ApiKeyAuth": {}}},
*     description="Leave a review.",
*     tags={"reviews"},
*     summary="Leave a review.",  
*     @OA\RequestBody(description="Review components", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="game_id", type="integer", example="30",	description="Gameplay"),
*    				@OA\Property(property="gameplay_rating", type="integer", example="100",	description="Gameplay"),
*    				@OA\Property(property="performance_rating", type="integer", example="100",	description="Performance" ),
*    				@OA\Property(property="graphics_rating", type="integer", example="100",	description="Graphics" ),
*    				@OA\Property(property="audio_rating", type="integer", example="100",	description="Audio" ),
*    				@OA\Property(property="satisfaction_rating", type="integer", example="100",	description="Satisfaction" ),
*    				@OA\Property(property="comment", type="string", example="Poprilicno guba",	description="Comment" ),
*           
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="Offer has been added to the database"
*     ),
*     @OA\Response(
*         response=500,
*         description="Internal server error"
*     ),
* )
*/

// Leave a review
Flight::route('POST /review', function(){
    $request = Flight::request();
    $data = $request->data->getData();
    $user = Flight::get('user');

    $data['user_id'] = $user['id'];
    // Flight::dao()->add($data['user_name'], $data['user_mail'], $data['user_password']);
    $podaci = Flight::ratingService()->add($data);
    Flight::json(["message" => "Review posted successfully"]);
});


?>