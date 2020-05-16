<?php
  /* Initialize the session */
  session_start();

if(isset($_POST['signup-submit'])){

    require 'dbh.inc.php';

    /* Initial variables */
    $username = $_POST['uid'];
    $email = $_POST['email'];
    $password = $_POST['pwd'];
    $passwordRepeat = $_POST['pwd-repeat'];
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];

    $_SESSION['uid'] = $username;
    $_SESSION['email'] = $email;
    $_SESSION['fname'] = $fname;
    $_SESSION['lname'] = $lname;

    /* Empty validation of the fields */
    if(empty($username) || empty($email) || empty($password) || empty($passwordRepeat) || empty($fname) || empty($lname)){
        header("Location: ../components/signup.php?error=emptyfields");
        exit();
    }
    else if(!filter_var($email, FILTER_VALIDATE_EMAIL) && !preg_match("/^[a-zA-Z0-9]*$/", $username)){
        header("Location: ../components/signup.php?error=invalidemailuid");
        exit();
    }
    else if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        header("Location: ../components/signup.php?error=invalidemail");
        exit();
    }
    else if(!preg_match("/^[a-zA-Z0-9]*$/", $username)){
        header("Location: ../components/signup.php?error=invaliduid");
        exit();
    }
    else if(!preg_match('/^(?=.*\d)(?=.*[A-Za-z])[0-9A-Za-z!.@#$%]{6,50}$/', $password)) {
        header("Location: ../components/signup.php?error=invalidpassword");
        exit();
    }
    else if($password !== $passwordRepeat){
        header("Location: ../components/signup.php?error=passwordcheck");
        exit();
    }
    else{

        /* Check for Unique User */
        $sql = "SELECT uidUsers FROM users WHERE uidUsers=?;";
        $stmt =mysqli_stmt_init($conn);
    
        /* Prepare statement for sql injection */
        if(!mysqli_stmt_prepare($stmt, $sql)){
            header("Location: ../components/signup.php?error=sqlerror");
            exit();
        }
        else{
            /* Bind the empty fields */
            mysqli_stmt_bind_param($stmt, "s", $username);
            
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
        
            /* Check how many results in stmt */
            $resultUidCheck = mysqli_stmt_num_rows($stmt);
            if($resultUidCheck > 0){
                
                /* Locate to the previous page*/
                header("Location: ../components/signup.php?error=usertaken");
                exit();
            }
            else{

                /* Check for Unique E-mail */
                $sql = "SELECT emailUsers FROM users WHERE emailUsers=?;";
                $stmt =mysqli_stmt_init($conn);
            
                /* Prepare statement for sql injection */
                if(!mysqli_stmt_prepare($stmt, $sql)){

                    /* Locate to the previous page*/
                    header("Location: ../components/signup.php?error=sqlerror");
                    exit();
                }
                else{

                    /* Bind the empty fields */
                    mysqli_stmt_bind_param($stmt, "s", $email);
                    
                    mysqli_stmt_execute($stmt);
                    mysqli_stmt_store_result($stmt);
                
                    /* Check how many results in stmt */
                    $resultEmailCheck = mysqli_stmt_num_rows($stmt);
                    if($resultEmailCheck > 0){
                        header("Location: ../components/signup.php?error=emailtaken");
                        exit();
                    }
                    else{

                        /* Sign up the user */
                        $sql = "INSERT INTO users (uidUsers, emailUsers, firstUsers, lastUsers, pwdUsers) VALUES (?, ?, ?, ?, ?);";
                        $stmt = mysqli_stmt_init($conn);
            
                        /* Check if the statement works for sql */
                        if(!mysqli_stmt_prepare($stmt, $sql)){

                            /* Locate to the previous page*/
                            header("Location: ../components/signup.php?error=sqlerror");
                            exit();
                        }
                        else{

                            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

                            mysqli_stmt_bind_param($stmt, "sssss", $username, $email, $fname, $lname, $hashedPassword);
                            mysqli_stmt_execute($stmt);

                                /* Send the email via sendgrid */
                                $to = $email;
                                $name = "Send Email From SendGrid";
                                $subject = "Sign-up, Welcome aboard!";
                                $message = file_get_contents('../resources/media/email.html');
                                

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
                            
                            /* Set session varibales to empty */
                            $_SESSION['uid'] = "";
                            $_SESSION['email'] = "";
                            $_SESSION['fname'] = "";
                            $_SESSION['lname'] = "";

                            /* Locate to the previous page*/
                            header("Location: ../index.php?signup=success");
                            exit();
                        }
                    }
                }
            }
        }
    }
    
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
}
else{

    /* Locate to the previous page*/
    header("Location: ../components/signup.php");
    exit();
}
