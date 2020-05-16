<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NME</title>
    <link rel="icon" type="image/ico" href="resources/img/logo.png" />

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">

    <!-- Bootstrap 4.0 CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <!-- Stylesheet imports -->
    <link rel="stylesheet" type="text/css" href="../resources/css/reset-password.css">

</head>
<body>
    <div class="reset-container">

        <form action="../includes/reset-request.inc.php" method="post">
            
            <h1>Send email</h1>
            
            <p class="input-paragraph">
                <?php    
                        if(isset($_GET["reset"])) {
                            if($_GET["reset"] == "success") {
                                echo 'You successfully sent an email!';
                            }
                        }else{
                            echo 'An e-mail will be send to you with instructions on how to reset your password. Please enter your email!';
                        }
                ?>
            </p>
        
            <div class="input-form">
                <input type="text" name="email" placeholder="Email" />
                <label for="emailuid">Email</label>
            </div>

            <p class="input-error">
                <?php    
                    if(isset($_GET["reset"])) {
                        if($_GET["reset"] == "success") {
                            echo '<spam class="input-success">Check your e-mail!</spam>';
                        }
                    }
                    else if(isset($_GET["error"])){
                        if($_GET["error"] == "emptyfields"){
                            echo '* Fill in all fields and try again!';
                        }
                        else if($_GET["error"] == "invalidemail"){
                            echo '* Invalid e-mail!';
                        }
                        else if($_GET["error"] == "expiredtoken"){
                            echo '* Expired token!';
                        }
                    }
                ?>
            </p>

            <button class="reset-btn" type="submit" name="reset-request-submit">Submit</button>

            <div class="additional">
                <a href="../index.php">Back</a>
            </div>

        </form>
    </div>
</body>
</html>