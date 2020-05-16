<?php

if(isset($_POST["create-password-submit"])){

    // Variables
    $selector = $_POST["selector"];
    $validator = $_POST["validator"];
    $pwd = $_POST["pwd"];
    $pwdRepeat = $_POST["pwd-repeat"];

    // Empty validation of the fields
    if( empty($pwd) || empty($pwdRepeat)){
        header("Location: ../components/create-new-password.php?selector=" . $selector . "&validator=" . $validator . "&error=emptyfields");
        exit();
    }
    else if($pwd !== $pwdRepeat){
        header("Location: ../components/create-new-password.php?selector=" . $selector . "&validator=" . $validator . "&error=passwordcheck");
        exit();
    }
    
    $currentDate = date("U");

    require 'dbh.inc.php';
    
    $sql = "SELECT * FROM passwordReset WHERE pwdResetSelector=? AND pwdResetExpires >= ?";
    $stmt = mysqli_stmt_init($conn);
    
    if(!mysqli_stmt_prepare($stmt, $sql)){
        echo "There was an error!";
        exit();
    }
    else{
        mysqli_stmt_bind_param($stmt, "ss", $selector, $currentDate);
        mysqli_stmt_execute($stmt);

        $result = mysqli_stmt_get_result($stmt);
        if(!$row = mysqli_fetch_assoc($result)){
            header("Location: ../components/reset-password.php?error=expiredtoken");
            exit();
        } else {

            // Convert hex to bin
            $tokenBin = hex2bin($validator);
            $tokenCheck = password_verify($tokenBin, $row["pwdResetToken"]);

            if($tokenCheck === false){
                header("Location: ../components/reset-password.php?error=expiredtoken");
                exit();
            }
            else if($tokenCheck === true){
                
                // Email check
                $tokenEmail = $row['pwdResetEmail'];

                $sql = "SELECT * FROM users WHERE emailUsers=?;";
                $stmt = mysqli_stmt_init($conn);
    
                if(!mysqli_stmt_prepare($stmt, $sql)){
                    echo "There was an error!";
                    exit();
                }
                else{
                    mysqli_stmt_bind_param($stmt, "s", $tokenEmail);
                    mysqli_stmt_execute($stmt);

                    $result = mysqli_stmt_get_result($stmt);
                    if(!$row = mysqli_fetch_assoc($result)){
                        echo "There was an error!";
                        exit();
                    } 
                    else {
                        // Update the password

                        $sql = "UPDATE users SET pwdUsers=? WHERE emailUsers=?;";
                        $stmt = mysqli_stmt_init($conn);
    
                        if(!mysqli_stmt_prepare($stmt, $sql)){
                            echo "There was an error!";
                            exit();
                        }
                        else{
                            $newHashedPassword = password_hash($pwd, PASSWORD_DEFAULT);

                            mysqli_stmt_bind_param($stmt, "ss", $newHashedPassword, $tokenEmail);
                            mysqli_stmt_execute($stmt);

                            // Delete the token
                            $sql = "DELETE FROM passwordReset WHERE pwdResetEmail=?;";
                            $stmt = mysqli_stmt_init($conn);
                            if(!mysqli_stmt_prepare($stmt, $sql)){
                                echo "There was an error!";
                                exit();
                            }
                            else{
                                mysqli_stmt_bind_param($stmt, "s", $tokenEmail);
                                mysqli_stmt_execute($stmt);
                                header("Location: ../index.php?newpwd=passwordupdated");
                            }
                        }
                    }
                }

            }

        }
    }

}
else {
    // Return the user to the index page
    header("Location: ../index.php");
}