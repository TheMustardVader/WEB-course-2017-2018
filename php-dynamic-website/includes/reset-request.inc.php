<?php

if(isset($_POST["reset-request-submit"])){

    // Create the token
    $selector = bin2hex(random_bytes(8));
    $token = random_bytes(32);

    $url = "/components/create-new-password.php?selector=" . $selector . "&validator=" . bin2hex($token); 

    $expires = date("U")  + 1800;

    // Connect to the db
    require 'dbh.inc.php';

    $userEmail = $_POST["email"];

    // Empty validation of the fields
    if(empty($userEmail)){
        header("Location: ../components/reset-password.php?error=emptyfields&email=".$email);
        exit();
    }
    else if(!filter_var($userEmail, FILTER_VALIDATE_EMAIL)){
        header("Location: ../components/reset-password.php?error=invalidemail");
        exit();
    }

    $sql = "DELETE FROM passwordReset WHERE pwdResetEmail=?";
    $stmt = mysqli_stmt_init($conn);
    
    if(!mysqli_stmt_prepare($stmt, $sql)){
        echo "There was an error!";
        exit();
    }
    else{
        mysqli_stmt_bind_param($stmt, "s", $userEmail);
        mysqli_stmt_execute($stmt);
    }

    $sql = "INSERT INTO passwordReset (pwdResetEmail, pwdResetSelector, pwdResetToken, pwdResetExpires) VALUES (?, ?, ?, ?);";
    $stmt = mysqli_stmt_init($conn);
    
    if(!mysqli_stmt_prepare($stmt, $sql)){
        echo "There was an error!";
        exit();
    }
    else{
        // Hash the info
     
        $hashedToken = password_hash($token, PASSWORD_DEFAULT);

        mysqli_stmt_bind_param($stmt, "ssss", $userEmail, $selector, $hashedToken, $expires);
        mysqli_stmt_execute($stmt);
    }

    mysqli_stmt_close($stmt);
    mysqli_close($conn);

    // Send the email

    $to = $userEmail;
    $subject = "Reset your password";
    $message = '<p>We recieved a password reset request. The link to reset your password int down below. If you can not see the request, you can ignore this email.</p>';
    $message .= '<p>Here is your password reset link: </br>';
    $message .= '<a href="' . $url .'">' . $url . '</a></p>';

    $headers = "From: constantin <mihailovkonstantin364@gmail.com>\r\n";
    $headers .= "Reply-To: mihailovkonstantin364@gmail.com\r\n";
    $headers .= "Content-type: text/html\r\n"; 

    mail($to, $subject, $message, $headers);

    header("Location: ../components/reset-password.php?reset=success");
} 
else {
    // Return the user to the index page
    header("Location: ../index.php");

}