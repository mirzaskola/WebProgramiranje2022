<?php

/**
 * @OA\Get(
 *      path="/categories", security={{"ApiKeyAuth": {}}},
 *      tags={"categories"},
 *      summary="Retrurn all categories from the API. ",
 *      @OA\Response(
 *          response=200,
 *          description="List of all categories in the database."
 *      )
 * )
 */

// Get all for admin panel
Flight::route('GET /categories', function(){
    $data = Flight::categoryService()->get_all();
    Flight::json($data);
    // print_r($users);
});

/**
 * @OA\Get(path="/categories/{id}", tags={"categories"}, security={{"ApiKeyAuth": {}}},
 *     summary="Get one category for admin panel from the database.",  
 *     @OA\Parameter(in="path", name="id", example=32, description="ID of category"),
 *     @OA\Response(response="200", description="One category for admin panel"),
 *     @OA\Response(response="404", description="Category not found")
 * )
 */

// Get one for admin panel
Flight::route('GET /categories/@id', function($id){
    $data = Flight::categoryService()->get_by_id($id);
    Flight::json($data);
});



/**
* @OA\Put(
*     path="/categories/{id}", security={{"ApiKeyAuth": {}}},
*     description="Update category from admin panel.",
*     tags={"categories"},
*     summary="Update category from admin panel.", 
*     @OA\Parameter(in="path", name="id", example=34, description="Category ID"),
*     @OA\RequestBody(description="Category info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="name", type="string", example="Simulationnnm", description="Category name"),
*          
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="Category has been updated"
*     ),
*     @OA\Response(
*         response=500,
*         description="Internal server error"
*     )
* )
*/

// Update from admin panel
Flight::route('PUT /categories/@id', function($id){
    $request = Flight::request();
    $data = $request->data->getData();
    Flight::categoryService()->update($id, $data);
    Flight::json(["message" => "Category updated successfully"]);

});


/**
* @OA\Post(
*     path="/categories", security={{"ApiKeyAuth": {}}},
*     description="Add category from admin panel.",
*     tags={"categories"},
*     summary="Add category from admin panel.",  
*     @OA\RequestBody(description="Category info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="name", type="string", example="Simulationnn", description="Category name"),  
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="Category has been added to the database"
*     ),
*     @OA\Response(
*         response=500,
*         description="Internal server error"
*     ),
* )
*/

// Add from admin panel
Flight::route('POST /categories', function(){
    $request = Flight::request();
    $data = $request->data->getData();
    $result = Flight::categoryService()->add($data);
    Flight::json(["message" => "Category added successfully"]);
});


/**
* @OA\Delete(
*     path="/categories/{id}", security={{"ApiKeyAuth": {}}},
*     description="Delete category from admin panel",
*     tags={"categories"},
*     summary="Delete category from admin panel.", 
*     @OA\Parameter(in="path", name="id", example=38, description="Category ID"),
*     @OA\Response(
*         response=200,
*         description="Category deleted"
*     ),
* )
*/

// delete
Flight::route('DELETE /categories/@id', function($id){
    Flight::categoryService()->delete($id);
    Flight::json(["message" => "Category deleted successfully"]);
});

?>