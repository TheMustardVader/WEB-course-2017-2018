<?php

if(isset($_POST['signup-submit'])){

    require 'dbh.inc.php';

    $username = $_POST['uid'];
    $email = $_POST['email'];
    $password = $_POST['pwd'];
    $passwordRepeat = $_POST['pwd-repeat'];
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];

    // Empty validation of the fields
    if(empty($username) || empty($email) || empty($password) || empty($passwordRepeat) || empty($fname) || empty($lname)){
        header("Location: ../components/signup.php?error=emptyfields&uid=".$username."&email=".$email);
        exit();
    }
    else if(!filter_var($email, FILTER_VALIDATE_EMAIL) && !preg_match("/^[a-zA-Z0-9]*$/", $username)){
        header("Location: ../components/signup.php?error=invalidemailuid");
        exit();
    }
    else if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        header("Location: ../components/signup.php?error=invalidemail&uid=".$username);
        exit();
    }
    else if(!preg_match("/^[a-zA-Z0-9]*$/", $username)){
        header("Location: ../components/signup.php?error=invaliduid&email=".$email);
        exit();
    }
    else if($password !== $passwordRepeat){
        header("Location: ../components/signup.php?error=passwordcheck&uid=".$username."&email=".$email);
        exit();
    }
    else{

        $sql = "SELECT uidUsers FROM users WHERE uidUsers=?;";
        $stmt =mysqli_stmt_init($conn);
    
        // Prepare statement for sql injection
        if(!mysqli_stmt_prepare($stmt, $sql)){
            header("Location: ../components/signup.php?error=sqlerror");
            exit();
        }
        else{
            // Bind the empty fields
            mysqli_stmt_bind_param($stmt, "s", $username);
            
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
        
            // Check how many results in stmt
            $resultCheck = mysqli_stmt_num_rows($stmt);
            if($resultCheck > 0){
                header("Location: ../components/signup.php?error=usertaken&email=".$email);
                exit();
            }
            else{
                // Sign up the user
                $sql = "INSERT INTO users (uidUsers, emailUsers, firstUsers, lastUsers, pwdUsers) VALUES (?, ?, ?, ?, ?);";
                $stmt =mysqli_stmt_init($conn);
    
                // Check if the statement works for sql 
                if(!mysqli_stmt_prepare($stmt, $sql)){
                    header("Location: ../components/signup.php?error=sqlerror");
                    exit();

                }
                else{
                    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

                    mysqli_stmt_bind_param($stmt, "sssss", $username, $email, $fname, $lname, $hashedPassword);
                    mysqli_stmt_execute($stmt);
                    header("Location: ../index.php?signup=success");
                    exit();
                }
            }
        }
    }

    mysqli_stmt_close($stmt);
    mysqli_close($conn);
}
else{
    header("Location: ../components/signup.php");
    exit();
}
