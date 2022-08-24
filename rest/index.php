<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


require_once __DIR__.'/../vendor/autoload.php';


require_once __DIR__.'/services/UserService.class.php';
require_once __DIR__.'/services/GameService.class.php';
require_once __DIR__.'/services/CommentService.class.php';
require_once __DIR__.'/services/OfferService.class.php';


Flight::register('userService', 'UserService');
Flight::register('gameService', 'GameService');
Flight::register('ratingService', 'RatingService');
Flight::register('categoryService', 'CategoryService');
Flight::register('commentService', 'CommentService');
Flight::register('offerService', 'OfferService');


require_once __DIR__.'/routes/UserRoutes.php';
require_once __DIR__.'/routes/GameRoutes.php';
require_once __DIR__.'/routes/CommentRoutes.php';
require_once __DIR__.'/routes/OfferRoutes.php';

Flight::start();



?>