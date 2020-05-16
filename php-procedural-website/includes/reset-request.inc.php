<?php

if(isset($_POST["reset-request-submit"])){

    /* Create the token */
    $selector = bin2hex(random_bytes(8));
    $token = random_bytes(32);

    $url = "http://nme-illustration.herokuapp.com/components/create-pwd.php?selector=" . $selector . "&validator=" . bin2hex($token); 

    $expires = date("U")  + 1800;

    /* Connect to the db */
    require 'dbh.inc.php';

    $userEmail = $_POST["email"];

    /* Empty validation of the fields */
    if(empty($userEmail)){

        /* Locate to the previous page*/
        header("Location: ../components/reset-pwd.php?error=emptyfields&email=".$email);
        exit();
    }
    else if(!filter_var($userEmail, FILTER_VALIDATE_EMAIL)){
        
        /* Locate to the previous page*/
        header("Location: ../components/reset-pwd.php?error=invalidemail");
        exit();
    }

    $sql = "DELETE FROM passwordReset WHERE pwdResetEmail=?";
    $stmt = mysqli_stmt_init($conn);
    
    if(!mysqli_stmt_prepare($stmt, $sql)){

        /* Locate to the error page*/
        header("Location: ../components/error.php");
        exit();
    }
    else{

        mysqli_stmt_bind_param($stmt, "s", $userEmail);
        mysqli_stmt_execute($stmt);
    }

    $sql = "INSERT INTO passwordReset (pwdResetEmail, pwdResetSelector, pwdResetToken, pwdResetExpires) VALUES (?, ?, ?, ?);";
    $stmt = mysqli_stmt_init($conn);
    
    if(!mysqli_stmt_prepare($stmt, $sql)){

        /* Locate to the error page*/
        header("Location: ../components/error.php");
        exit();
    }
    else{

        /* Hash the info */
        $hashedToken = password_hash($token, PASSWORD_DEFAULT);

        mysqli_stmt_bind_param($stmt, "ssss", $userEmail, $selector, $hashedToken, $expires);
        mysqli_stmt_execute($stmt);
    }

    mysqli_stmt_close($stmt);
    mysqli_close($conn);

    /* Send the email via sendgrid */
    $to = $userEmail;
    $name = "Send Email From SendGrid";
    $subject = "Reset your password";
    $message = file_get_contents('../resources/media/pwd.html');
    $message .= '<p>Here is your password reset link: </br>';
    $message .= '<a  href="' . $url .'">' . $url . '</a></p>';

    /* Please, read the documentation for more details */
    $headers = "From: constantin <mihailovkonstantin364@gmail.com>\r\n";
    $headers .= "Reply-To: mihailovkonstantin364@gmail.com\r\n";
    $headers .= "Content-type: text/html\r\n"; 

    /* Local php mail-server method */    
    // mail($to, $subject, $message, $headers);

    $headers_curl = array(
        'Authorization: Bearer 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',
        'Content-Type: application/json',
    );

    $data_curl = array(
        "personalizations" => array(
            array(
               "to" => array(
                   array(
                       "email" => $to,
                       "name" => $name
                   )
               ) 
            )
        ),
        "from" => array(
            "email" => "mihailovkonstantin364@gmail.com"
        ),
        "subject" => $subject,
        "content" => array(
            array(
                "type" => "text/html",
                "value" => $message
            )
        )
    );
    
    /* API_KEY => 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 */

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://api.sendgrid.com/v3/mail/send");
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data_curl));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers_curl);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $response = curl_exec($ch);
    curl_close($ch);

    header("Location: ../components/reset-pwd.php?reset=success");
    
} 
else {

    /* Return the user to the index page */
    header("Location: ../index.php");

}