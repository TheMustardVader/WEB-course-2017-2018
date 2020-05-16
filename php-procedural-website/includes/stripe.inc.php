<?php

    require_once "confing.inc.php";

    \Stiper\Stirpe::setVerifySslCerts(false);



    if(!isset($_POST['token'])){
        header("Location: ../components/payment.php");
        exit();
    }

    $token = $_POST['stripeToken'];
    $email = $_POST['stripeEmail'];

    $charge = \Stripe\Charge::create(array(
    'amount' => $attributes['amount'],
    'currency' => 'usd',
    'description' => "Coffee",
    'source' => $token,
    ));

    header("Location: ../components/welcome.php");
    exit();