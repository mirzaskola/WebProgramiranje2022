<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once __DIR__.'/../vendor/autoload.php';


require_once __DIR__.'/services/UserService.class.php';
require_once __DIR__.'/services/GameService.class.php';
require_once __DIR__.'/services/CommentService.class.php';
require_once __DIR__.'/services/OfferService.class.php';
require_once __DIR__.'/services/RatingService.class.php';
require_once __DIR__.'/services/CategoryService.class.php';
require_once __DIR__.'/dao/UserDao.class.php';


Flight::register('userDao', 'UserDao');
Flight::register('userService', 'UserService');
Flight::register('gameService', 'GameService');
Flight::register('ratingService', 'RatingService');
Flight::register('categoryService', 'CategoryService');
Flight::register('commentService', 'CommentService');
Flight::register('offerService', 'OfferService');


Flight::route('/*', function(){
    //return TRUE;
    //perform JWT decode
    $path = Flight::request()->url;
    $method = Flight::request()->method;
    if ($path == '/login' || $path == '/docs.json' || $path == '/toprated' || $path == '/allnames' || $path == '/offers' || ($path == '/games' && $method == 'GET') || str_contains($path, 'games/') || $path == '/signup' || $path == '/games-search' || str_contains($path, 'reviews/')) return TRUE; // exclude login route from middleware
  
    $headers = getallheaders();
    if (@!$headers['Authorization']){
      Flight::json(["message" => "Authorization is missing"], 403);
      return FALSE;
    }else{
      try {
        $decoded = (array)JWT::decode($headers['Authorization'], new Key(Config::JWT_SECRET(), 'HS256'));
        Flight::set('user', $decoded);
        return TRUE;
      } catch (\Exception $e) {
        Flight::json(["message" => "Authorization token is not valid"], 403);
        return FALSE;
      }
    }
  });
  
  /* REST API documentation endpoint */
  Flight::route('GET /docs.json', function(){
    $openapi = \OpenApi\scan('routes');
    header('Content-Type: application/json');
    echo $openapi->toJson();
  });

require_once __DIR__.'/routes/UserRoutes.php';
require_once __DIR__.'/routes/GameRoutes.php';
require_once __DIR__.'/routes/CommentRoutes.php';
require_once __DIR__.'/routes/OfferRoutes.php';
require_once __DIR__.'/routes/RatingRoutes.php';
require_once __DIR__.'/routes/CategoryRoutes.php';

Flight::start();

?>
