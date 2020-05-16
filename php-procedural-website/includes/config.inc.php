<?php

    require_once "../includes/account.inc.php";
    require_once "../stripe/init.php";

    $stiperDetails = array(
        "secretKey" => "sk_test_hc91OslPl2KxnTNrlvRoUJdB00YlDU5eIP",
        "publishableKey" => "pk_test_waATswGXEIq0IY4fHA7wF8XL00lWJvhFl7"
    );

    	

	// Set your secret key. Remember to switch to your live secret key in production!
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    \Stripe\Stripe::setApiKey($stiperDetails['secretKey']);
	
