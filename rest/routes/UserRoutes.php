<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

/**
 * @OA\Get(
 *      path="/users", security={{"ApiKeyAuth": {}}},
 *      tags={"users"},
 *      summary="Retrurn all users for admin panel.",
 *      @OA\Response(
 *          response=200,
 *          description="List of all users in the database."
 *      )
 * )
 */

// get all users for admin
Flight::route('GET /users', function(){
    $data = Flight::userService()->get_all();
    unset($data['password']);
    Flight::json($data, 200);
});

/**
 * @OA\Get(path="/users/{id}", tags={"users"}, security={{"ApiKeyAuth": {}}}, summary="Get one user for admin panel.",  
 *     @OA\Parameter(in="path", name="id", example=2, description="ID of user"),
 *     @OA\Response(response="200", description="Fetch individual user in admin panel"),
 *     @OA\Response(response="404", description="User not found")
 * )
 */

// get one user for admin
Flight::route('GET /users/@id', function($id){
    $data = Flight::userService()->get_by_id($id);
    unset($data['password']);
    Flight::json($data, 200);
});

/**
 * @OA\Get(path="/myprofile", tags={"users"}, security={{"ApiKeyAuth": {}}}, summary="Get profile info.",  
 *     @OA\Response(response="200", description="Displays content for my profile"),
 *     @OA\Response(response="403", description="User is not logged in"),
 * )
 */

// get my profile info
Flight::route('GET /myprofile', function(){
    $user = Flight::get('user');
    if (isset($user['id'])){
        $data = Flight::userService()->get_by_id($user['id']);
        unset($data['password']);
        Flight::json($data, 200);
    }
    else{
        Flight::json("User is not logged in", 403);
    }
});

/**
* @OA\Put(
*     path="/myprofile/{id}", security={{"ApiKeyAuth": {}}},
*     description="Update user from my profile.",
*     tags={"users"},
*     summary="Update user from my profile.", 
*     @OA\Parameter(in="path", name="id", example=2, description="User ID"),
*     @OA\RequestBody(description="User information excluding password", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="username", type="string", example="ado gegaj",	description="Username"),
*    				@OA\Property(property="email", type="string", example="ago@gegaj.com",	description="Email" ),
*          
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="User info has been updated"
*     ),
*     @OA\Response(
*         response=500,
*         description="Internal server error"
*     )
* )
*/

// update for my profile
Flight::route('PUT /myprofile/@id', function($id){
    $request = Flight::request();
    $data = $request->data->getData();
    Flight::userService()->update($id, $data);
    Flight::json(["message" => "Updated successfully"], 200);
});

/**
* @OA\Put(
*     path="/changepassword/{id}", security={{"ApiKeyAuth": {}}},
*     description="Update password from my profile.",
*     tags={"users"},
*     summary="Update password from my profile.", 
*     @OA\Parameter(in="path", name="id", example=2, description="User ID"),
*     @OA\RequestBody(description="User information excluding password", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="password", type="string", example="1234",	description="Password"),
*          
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="User password has been updated"
*     ),
*     @OA\Response(
*         response=500,
*         description="Internal server error"
*     )
* )
*/

// update password for my profile
Flight::route('PUT /changepassword/@id', function($id){
    $request = Flight::request();
    $data = $request->data->getData();
    $data['password'] = md5($data['password']);
    unset($data['newpassword']);
    Flight::userService()->update($id, $data);
    unset($data['password']);
    Flight::json(["message" => "Password has been updated"], 200);
});


/**
* @OA\Post(
*     path="/users", security={{"ApiKeyAuth": {}}},
*     description="Add user from admin panel.",
*     tags={"users"},
*     summary="Add user from admin panel.",  
*     @OA\RequestBody(description="Username, email and password", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="username", type="string", example="ado gegaj",	description="Username"),
*    				@OA\Property(property="email", type="string", example="ado@gegaj.com",	description="Email" ),
*    				@OA\Property(property="password", type="string", example="1234",	description="Password" ),
*           
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="User has been added"
*     ),
*     @OA\Response(
*         response=500,
*         description="Internal server error"
*     ),
* )
*/

// insert from admin panel
Flight::route('POST /users', function(){
    $request = Flight::request();
    $data = $request->data->getData();
    $data['password'] = md5($data['password']);
    // Flight::dao()->add($data['user_name'], $data['user_mail'], $data['user_password']);
    $podaci = Flight::userService()->add($data);
    Flight::json(["message" => "User has been added"], 200);

});


/**
* @OA\Put(
*     path="/users/{id}", security={{"ApiKeyAuth": {}}},
*     description="Update user info from admin panel.",
*     tags={"users"},
*     summary="Update user info from admin panel.", 
*     @OA\Parameter(in="path", name="id", example=2, description="User ID"),
*     @OA\RequestBody(description="User information excluding password", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="username", type="string", example="ado gegaj",	description="Username"),
*    				@OA\Property(property="email", type="string", example="ado@gegaj.com",	description="Email"),
*    				@OA\Property(property="user_role", type="integer", example="1",	description="User role"),
*          
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="User password has been updated"
*     ),
*     @OA\Response(
*         response=500,
*         description="Internal server error"
*     )
* )
*/

// update for admin panel
Flight::route('PUT /users/@id', function($id){
    $request = Flight::request();
    $data = $request->data->getData();
    // $data['password'] = md5($data['password']);
    // Flight::dao()->update($id, $data['user_name'], $data['user_mail'], $data['user_password']);
    // $data['id'] = $id;
    Flight::userService()->update_admin($id, $data);
    Flight::json(["message" => "User info has been updated"], 200);

});

/**
* @OA\Delete(
*     path="/deleteusers/{id}", security={{"ApiKeyAuth": {}}},
*     description="Delete user from admin panel",
*     tags={"users"},
*     summary="Delete user from admin panel.", 
*     @OA\Parameter(in="path", name="id", example=5, description="User ID"),
*     @OA\Response(
*         response=200,
*         description="User deleted"
*     ),
*     @OA\Response(
*         response=404,
*         description="User not found"
*     )
* )
*/

// delete from admin panel
Flight::route('DELETE /deleteusers/@id', function($id){
    Flight::userService()->delete($id);
    Flight::json(["message"=>"deleted"], 200);
});


/**
* @OA\Post(
*     path="/login", 
*     description="Login user.",
*     tags={"users"},
*     summary="Log in user.",  
*     @OA\RequestBody(description="User email and password", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="email", type="string", example="ado@gegaj.com",	description="Email"),
*    				@OA\Property(property="password", type="string", example="1234",	description="Password" ),
*           
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="JWT token on successful response"
*     ),
*     @OA\Response(
*         response=404,
*         description="User does not exist or wrong password"
*     ),
* )
*/

// Log in user
Flight::route('POST /login', function(){
    $login_data = Flight::request()->data->getData();
    $response = Flight::userService()->login($login_data);
    if(isset($response['token'])){
        Flight::json($response['token'], 200); 
    }
    else{
        Flight::json(["message" => $response['message']], $response['code']);
    }
});

/**
* @OA\Post(
*     path="/signup",
*     description="Register user.",
*     tags={"users"},
*     summary="Register user.",  
*     @OA\RequestBody(description="Username, email and password", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="username", type="string", example="Dino Keco",	description="Username" ),
*    				@OA\Property(property="email", type="string", example="dinokeco@gmail.com",	description="Email"),
*    				@OA\Property(property="password", type="string", example="1234",	description="Password" ),
*   
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="Successfully added user to database."
*     ),
*     
* )
*/

// Register user
Flight::route('POST /signup', function(){
    $sign_up_data = Flight::request()->data->getData();
    $sign_up_data['password'] = md5($sign_up_data['password']);
    $sign_up_data['user_role'] = 0;
    Flight::userService()->add($sign_up_data);
    Flight::json(["message" => "Signed up successfully"], 200);
});

/**
 * @OA\Get(path="/checkuser", tags={"users"}, security={{"ApiKeyAuth": {}}}, summary="Checks user privilege (role).",  
 *     @OA\Response(response="200", description="Returns user role from database"),
 *     @OA\Response(response="403", description="Forbidden"),
 * )
 */

// Check user role
Flight::route('GET /checkuser', function(){
    $user = Flight::get('user');
    if (isset($user['id'])){
        Flight::json(Flight::userService()->check_user_role($user), 200);
    }
    else{
        Flight::json("guest", 200);
    }
});

?>