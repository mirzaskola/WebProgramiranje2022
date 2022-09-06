<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


require_once __DIR__.'/services/RatingService.class.php';
require_once __DIR__.'/services/GameService.class.php';

$servis = new RatingService();
// $servis = new GameService();
print_r($servis->get_total_rating_by_post(11));
// print_r($servis->get_game_by_name("Red"));
// print_r($servis->get_highest_rated_games());
// print_r($servis->dao->get_game_by_name("stel"));
// print_r(Config::DB_PASSWORD());


?>