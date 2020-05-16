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
    <link rel="stylesheet" type="text/css" href="../resources/css/reset-pwd.css">

</head>
<body>
    <div class="reset-container">

            <?php 
                $selector = $_GET["selector"];
                $validator = $_GET["validator"];

                if(empty($selector) || empty($validator)){
                    
                    header("location: error.php");
                    exit();
                    
                }
                else{
                    if(ctype_xdigit($selector) !== false && ctype_xdigit($validator) !== false){
                        ?>
                            <form action="../includes/create-pwd.inc.php" method="post">

                                <h1>Reset password</h1>
                                
                                <input type="hidden" name="selector" value="<?php echo $selector; ?>">
                                
                                <p class="input-error"> </p>
                                
                                <input type="hidden" name="validator" value="<?php echo $validator; ?>">
                                
                                <p class="input-error"> </p>
                                
                                <div class="input-form">
                                    <input type="password" name="pwd" placeholder="Enter a new password">
                                    <label for="lname">Enter a new password</label>
                                </div>

                                <p class="input-error"> </p>

                                <div class="input-form">
                                    <input type="password" name="pwd-repeat" placeholder="Repeat new password">
                                    <label for="lname">Repeat new password</label>
                                </div>

                                <p class="input-error">
                                    <?php
                                    if (isset($_GET['error'])) {
                                        if ($_GET['error'] == "passwordcheck") {
                                            echo '* Your passwords do not match!';
                                        }
                                        else if ($_GET['error'] == "emptyfields") {
                                            echo ' * Fill in all fields!';
                                        }
                                    }
                                    ?>
                                </p>

                                <button class="reset-btn" type="submit" name="create-password-submit">Reset</button>

                            </form>
                        <?php
                    }
                }
            ?>
                             
    </div>
</body>
</html>