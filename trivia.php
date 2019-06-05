<?php
  //get catagories
  if($_GET['mode'] == "categories") {
    $catagories = scandir('trivia');
    echo json_encode($catagories);
  }

  //get trivia question
  if($_GET['mode'] == "category") {
    $triviafiles = "trivia/";
    $categoryName = strtolower($_GET["name"]) . "/";
    $trivia = scandir($triviafiles . $categoryName);

    echo json_encode(readfile($triviafiles . $categoryName . $trivia[rand(2,count($trivia) - 1)]));
  }
?>
