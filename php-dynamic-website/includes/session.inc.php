<?php

 // Initialize the session
 session_start();

if(isset($_POST['mode'])){
    $mode = $_POST['mode'];
    echo json_encode($mode);
    $_SESSION['theme'] = $mode;
}