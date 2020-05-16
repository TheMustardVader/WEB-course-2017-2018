<?php
    
    /* Check if the user is logged in, if not then redirect him to login page */
    if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
        header("location: ../index.php");
        exit;
    }
    
?>

<main>
    <div class="home-container">
        <div class="home-wrapper">
            <div class="to">
                <img src="../resources/media/wild.png"/>                
            <div>
            <h3 class="title">Hi there!</h3>
            <p class="text">Check all the tags on the menu.</p>
        </div>
    </div>
</main>
