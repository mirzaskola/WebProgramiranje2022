<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


require_once __DIR__.'/../vendor/autoload.php';


require_once __DIR__.'/services/UserService.class.php';
require_once __DIR__.'/services/GameService.class.php';


Flight::register('userService', 'UserService');
Flight::register('gameService', 'GameService');
Flight::register('ratingService', 'RatingService');
Flight::register('categoryService', 'CategoryService');
Flight::register('commentService', 'CommentService');


require_once __DIR__.'/routes/UserRoutes.php';
require_once __DIR__.'/routes/GameRoutes.php';

Flight::start();



?>