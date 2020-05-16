<?php
   
    require_once 'dbh.inc.php';

    $attributes = array();

    if(isset($_SESSION['userUid'])){

        $name= "";
        $email = "";
        $emailuid = $_SESSION['userUid'];
        
        $sql = "SELECT * FROM users WHERE uidUsers=? OR emailUsers=?;";
        $stmt = mysqli_stmt_init($conn);
        
        /* Check if the statement works for sql */
        if(!mysqli_stmt_prepare($stmt, $sql)){

            header("Location: ../components/error.php");
            exit();

        }
        else{           

            mysqli_stmt_bind_param($stmt, "ss", $emailuid, $emailuid);
            mysqli_stmt_execute($stmt);

            $result = mysqli_stmt_get_result($stmt);
            if($row = mysqli_fetch_assoc($result)){
                $name = $row['firstUsers'];
                $name = $name." ".$row['lastUsers'];
                $email = $row['emailUsers'];
            }
        }

        $attributes = array(
            "name" => $name,
            "email" => $email,
            "amount" => 500
        );

    }