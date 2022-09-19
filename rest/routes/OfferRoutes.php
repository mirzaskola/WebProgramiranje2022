<?php

/**
 * @OA\Get(
 *      path="/offers",
 *      tags={"offers"},
 *      summary="Retrurn all offers from the API. ",
 *      @OA\Response(
 *          response=200,
 *          description="List of all offers in the database."
 *      )
 * )
 */

// get all
Flight::route('GET /offers', function(){
    $data = Flight::offerService()->get_all();
    Flight::json($data, 200);
    // print_r($users);
});


/**
 * @OA\Get(path="/offers/{id}", tags={"offers"}, security={{"ApiKeyAuth": {}}},
 *     summary="Get one offer for admin panel from the database.",  
 *     @OA\Parameter(in="path", name="id", example=32, description="ID of offer"),
 *     @OA\Response(response="200", description="One offer for admin panel"),
 *     @OA\Response(response="404", description="Offer not found")
 * )
 */

// get one for admin panel
Flight::route('GET /offers/@id', function($id){
    $data = Flight::offerService()->get_by_id($id);
    Flight::json($data, 200);
});



/**
* @OA\Put(
*     path="/offers/{id}", security={{"ApiKeyAuth": {}}},
*     description="Update offer from my profile.",
*     tags={"offers"},
*     summary="Update offer from my profile.", 
*     @OA\Parameter(in="path", name="id", example=34, description="Offer ID"),
*     @OA\RequestBody(description="Offer components", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="link", type="string", example="link.com",	description="Link"),
*    				@OA\Property(property="partner_name", type="integer", example="partner",	description="Partner name" ),
*    				@OA\Property(property="price", type="string", example="1.99$",	description="Price" ),
*    				@OA\Property(property="game_name", type="string", example="Igrica",	description="Game name" ),
*    				@OA\Property(property="is_active", type="integer", example="0",	description="Active (0 or 1)" ),
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

// Update from admin panel
Flight::route('PUT /offers/@id', function($id){
    $request = Flight::request();
    $data = $request->data->getData();
    Flight::offerService()->update($id, $data);
    Flight::json(["message" => "Offer updated successfully"], 200);

});


/**
* @OA\Post(
*     path="/offers", security={{"ApiKeyAuth": {}}},
*     description="Add Offer from admin panel.",
*     tags={"offers"},
*     summary="Add Offer from admin panel.",  
*     @OA\RequestBody(description="Offer info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="link", type="string", example="link.com",	description="Link"),
*    				@OA\Property(property="partner_name", type="integer", example="partner",	description="Partner name" ),
*    				@OA\Property(property="price", type="string", example="1.99$",	description="Price" ),
*    				@OA\Property(property="game_name", type="string", example="Igrica",	description="Game name" ),
*    				@OA\Property(property="is_active", type="integer", example="0",	description="Active (0 or 1)" ),
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

// add from admin panel
Flight::route('POST /offers', function(){
    $request = Flight::request();
    $data = $request->data->getData();
    $result = Flight::offerService()->add($data);
    Flight::json(["message" => "Offer added successfully"], 200);

});



/**
* @OA\Delete(
*     path="/offers/{id}", security={{"ApiKeyAuth": {}}},
*     description="Delete offer from admin panel",
*     tags={"offers"},
*     summary="Delete offer from admin panel.", 
*     @OA\Parameter(in="path", name="id", example=38, description="Offer ID"),
*     @OA\Response(
*         response=200,
*         description="Offer deleted"
*     ),
* )
*/

// delete from admin panel
Flight::route('DELETE /offers/@id', function($id){
    Flight::offerService()->delete($id);
    Flight::json(["message" => "Offer deleted successfully"], 200);
});

?>