<?php

    /* Initialize the session */
    session_start();

    if(isset($_POST['mode'])){
        $mode = $_POST['mode'];
        echo json_encode($mode);
        $_SESSION['theme'] = $mode;
    }

    if(isset($_POST['animation'])){
        $animation = $_POST['animation'];
        echo json_encode($animation);
        $_SESSION['display'] = $animation;
    }

    if(isset($_POST['info'])){
        $info = $_POST['info'];
        echo json_encode($info);
        $_SESSION['info'] = $info;
    }