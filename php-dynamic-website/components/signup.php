<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Saro</title>
    <link rel="icon" type="image/ico" href="resources/img/logo.png" />

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">

    <!-- Bootstrap 4.0 CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <!-- Stylesheet imports -->
    <link rel="stylesheet" type="text/css" href="../resources/css/signup.css">
</head>

<body>
    <main>
        <div class="signup-container">

            <form action="../includes/signup.inc.php" method="post">

                <h1>Sign-up</h1>

                <div class="input-form">
                    <input type="text" id="fname" name="fname" placeholder="First name">
                    <label for="fname">First name</label>
                </div>

                <p class="signup-error"> </p>

                <div class="input-form">
                    <input type="text" id="lname" name="lname" placeholder="Last name">
                    <label for="lname">Last name</label>
                </div>

                <p class="signup-error"> </p>

                <div class="input-form">
                    <input type="text" name="email" placeholder="Email">
                    <label for="email">Email</label>
                </div>

                <p class="signup-error">
                    <?php
                    if (isset($_GET['error'])) {
                        if ($_GET['error'] == "invalidemail") {
                            echo '* Invalid email!';
                        }
                    }
                    ?>
                </p>

                <div class="input-form">
                    <input type="text" name="uid" placeholder="What should we call you?">
                    <label for="uid">Username</label>
                </div>

                <p class="signup-error">
                    <?php
                    if (isset($_GET['error'])) {
                        if ($_GET['error'] == "invaliduid") {
                            echo '* Invalid username!';
                        } 
                        else if ($_GET['error'] == "invalidemailuid") {
                            echo '* Invalid username and e-mail';
                        }
                        else if ($_GET['error'] == "usertaken") {
                            echo '* Username is already taken!';
                        }
                    }
                    ?>
                </p>

                <div class="input-form">
                    <input type="password" name="pwd" placeholder="Password">
                    <label for="lname">Password</label>
                </div>

                <p class="signup-error"> </p>

                <div class="input-form">
                    <input type="password" name="pwd-repeat" placeholder="Confirmation Password">
                    <label for="lname">Confirm password</label>
                </div>

                <p class="signup-error">
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

                <button class="signup-btn" type="submit" name="signup-submit">Sign-up</button>

                <div class="additional">
                    Already on? <a href="../index.php">Login</a>
                </div>

            </form>

            <div>

    </main>
</body>

</html>