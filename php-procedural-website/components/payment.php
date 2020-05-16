<?php
    session_start();
    
    /* Check if the user is logged in, if not then redirect him to login page */
    if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
        header("location: ../index.php");
        exit;
    }

    require "../includes/config.inc.php";

?>

<!DOCTYPE html>
<html lang="en" data-theme="<?php echo $_SESSION['theme'] ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NME</title>
    <script src="https://js.stripe.com/v3/"></script>

    <link rel="icon" type="image/ico" href="../resources/media/logo.png" />

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- Bootstrap 4.0 CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <!-- Stylesheet imports -->
    <link rel="stylesheet" type="text/css" href="../resources/css/payment.css">

</head>
<body>
    <!-- Icon -->

    <div class="logo-container">
        <div class="img">
            <svg class="svg-w" width="28px" height="36px" viewBox="0 0 33 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4451 10.0694L4.47266 9.99765L10.352 46.9467H11.6347H23.3933H24.6761L30.5554 9.99765L16.4451 10.0694Z" fill="#FF9100"></path>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4451 10.0694L4.47266 9.99765L10.352 46.9467H11.6347H20.4002H21.683L27.5623 9.99765L16.4451 10.0694Z" fill="#FFDD00"></path>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.05469 9.99768H31.9478V6.59027H1.05469V9.99768Z" fill="white"></path>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.05469 9.99768H31.9478V6.59027H1.05469V9.99768Z" stroke="black" stroke-width="1.55172"></path>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M25.9613 1.05325H18.5855H14.2027H6.82686L4.58203 6.16436H14.2027H18.5855H28.2062L25.9613 1.05325Z" fill="white"></path>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M25.9574 1.05325H18.5816H14.1988H6.82295L4.57812 6.16436H14.1988H18.5816H28.2023L25.9574 1.05325Z" stroke="#050505" stroke-width="1.55172"></path>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4463 10.0694L2.33594 9.99765L8.21525 46.9467H9.49801H23.3946H24.6773L30.5566 9.99765L16.4463 10.0694Z" stroke="black" stroke-width="1.55172"></path>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M30.9835 20.4329H16.8987H15.8856H1.80078L4.43535 35.1273L16.3922 34.9992L28.349 35.1273L30.9835 20.4329Z" fill="white"></path>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M30.9835 20.4329H16.8987H15.8856H1.80078L4.43535 35.1273L16.3922 34.9992L28.349 35.1273L30.9835 20.4329Z" stroke="black" stroke-width="1.55172"></path>
            </svg>
        </div>
        <a href="../index.php" class="logo-link"></a>
    </div>

    <div class="pay-container">
        <div class="pay-wrapper"> 
        <!-- Subject -->
        <div class="pay-subject">
            <h1> Buy <span class="name">Constantin</span> a coffee!</h3>
        </div>

        <!-- Support pay -->
        <div class="pay-support-container"> 
            <div class="pay-support"> 
                <!-- Coffe cup -->
                <div class="pay-box">
                    <span class="pay-count">x</span>
                    <svg class="svg-w" width="33" height="48" viewBox="0 0 33 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4451 10.0694L4.47266 9.99765L10.352 46.9467H11.6347H23.3933H24.6761L30.5554 9.99765L16.4451 10.0694Z" fill="#FF9100"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4451 10.0694L4.47266 9.99765L10.352 46.9467H11.6347H20.4002H21.683L27.5623 9.99765L16.4451 10.0694Z" fill="#FFDD00"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.05469 9.99768H31.9478V6.59027H1.05469V9.99768Z" fill="white"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.05469 9.99768H31.9478V6.59027H1.05469V9.99768Z" stroke="black" stroke-width="1.55172"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M25.9613 1.05325H18.5855H14.2027H6.82686L4.58203 6.16436H14.2027H18.5855H28.2062L25.9613 1.05325Z" fill="white"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M25.9574 1.05325H18.5816H14.1988H6.82295L4.57812 6.16436H14.1988H18.5816H28.2023L25.9574 1.05325Z" stroke="#050505" stroke-width="1.55172"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4463 10.0694L2.33594 9.99765L8.21525 46.9467H9.49801H23.3946H24.6773L30.5566 9.99765L16.4463 10.0694Z" stroke="black" stroke-width="1.55172"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M30.9835 20.4329H16.8987H15.8856H1.80078L4.43535 35.1273L16.3922 34.9992L28.349 35.1273L30.9835 20.4329Z" fill="white"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M30.9835 20.4329H16.8987H15.8856H1.80078L4.43535 35.1273L16.3922 34.9992L28.349 35.1273L30.9835 20.4329Z" stroke="black" stroke-width="1.55172"></path>
                    </svg>
                    <span class="abs-count">$5</span>
                </div>
                <div class="pay-box payment-box">
                    <span class="payment-count">$5</span>                    
                </div>
                <div class="pay-box-wrapper"> 

                    <a onclick="supportPay(1, 's')" class="s pay-box circle selected-box">
                        1
                    </a>
                    <a onclick="supportPay(3, 'm')" class="m pay-box circle">
                        3
                    </a>
                    <a onclick="supportPay(5, 'l')" class="l pay-box circle">
                        5       
                    </a>
                </div>

            </div>

        </div>

        <!-- Support btn -->

        <!-- Payment -->
        <form action="../components/welcome.php" method="post">
            <script 
                src="https://checkout.stripe.com/checkout.js" class="stripe-button"
                data-key="<?php echo $stiperDetails['publishableKey'] ?>"
                data-amount=""
                data-name="<?php echo $attributes['name']?>"                
                data-description="Coffee"
                data-image="../resources/media/logo.png"
                data-local="auto"
            >
            </script>
            <script>
            // Hide default stripe button, be careful there if you
            // have more than 1 button of that class
            document.getElementsByClassName("stripe-button-el")[0].style.display = 'none';
            </script>
            <button class="support-btn" type="submit" name="support-submit">
            Support  <span class="support-count">$5</span>
            </button>
        </form>

        <div class="additional">
                <a href="../index.php">Back</a>
        </div>
        </div>
    </div>
    

    <!-- JavaScript -->
    <script type="text/javascript" src="../resources/javascript/payment.js"></script>
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
</body>
</html>