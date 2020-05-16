<?php

if(isset($_POST['login-submit'])){
 
    require 'dbh.inc.php';

    $emailuid = $_POST['emailuid'];
    $password = $_POST['pwd'];

    if(empty($emailuid) || empty($password)){
 
        /* Locate to the previous page*/
        header("Location: ../index.php?error=emptyfields");
        exit();
    }
    else{

        $sql = "SELECT * FROM users WHERE uidUsers=? OR emailUsers=?;";
        $stmt = mysqli_stmt_init($conn);
           
        /* Check if the statement works for sql */
        if(!mysqli_stmt_prepare($stmt, $sql)){

            header("Location: ../index.php?error=sqlerror");
            exit();

        }
        else{           

            mysqli_stmt_bind_param($stmt, "ss", $emailuid, $emailuid);
            mysqli_stmt_execute($stmt);

            $result = mysqli_stmt_get_result($stmt);
            if($row = mysqli_fetch_assoc($result)){
                
                $passwordCheck = password_verify($password, $row['pwdUsers']);
                if($passwordCheck == false){

                    /* Locate to the previous page*/
                    header("Location: ../index.php?error=wrongpassword");
                    exit();
                }
                else if($passwordCheck == true){

                    /* Initialize the session */
                    session_start();
                    
                    $_SESSION['userId']= $row['idUsers'];
                    $_SESSION['userUid']= $row['uidUsers'];
                    $_SESSION['theme'] = 'light';
                    $_SESSION['display'] = 'anim-display';
                    $_SESSION['loggedin']= true;
                    $_SESSION['info'] = 'display';

                    /* Locate to the previous page*/
                    header("Location: ../index.php?login=success");
                    exit();
                }else{
                    
                    /* Locate to the previous page*/    
                    header("Location: ../index.php?error=wronguser");
                    exit();
                }

            }else{
                
                /* Locate to the previous page*/
                header("Location: ../index.php?error=nouser");
                exit();
            }    
        }
    }

}else{

    /* Locate to the previous page*/
    header("Location: ../index.php");
    exit();
}
