<!-- Separate file for the login form -->
<div class="login-container">

    <form action="includes/login.inc.php" method="post">
        <h1>Log-in</h1>

        <div class="input-form">

            <input type="text" name="emailuid" placeholder="Username / Email" />
            <label for="emailuid"> Username / Email</label>
        </div>

        <p class="login-error">
            <?php
            if (isset($_GET['error'])) {
                if ($_GET['error'] == "wronguser" || $_GET['error'] == "nouser") {
                    echo '* Invalid username or email!';
                }
            }
            ?>
        </p>

        <div class="input-form">
            <input type="password" name="pwd" placeholder="Password" />
            <label for="pwd">Password</label>
        </div>

        <p class="login-error">
            <?php
            if (isset($_GET['error'])) {
                if ($_GET['error'] == "wrongpassword") {
                    echo '* Wrong password!';
                } else if ($_GET['error'] == "emptyfields") {
                    echo '* Fill in all fields!';
                }
            }
            else if(isset($_GET["newpwd"])) {
                if($_GET["newpwd"] == "passwordupdated") {
                    echo '<spam class="login-success">Your password is successfully updated!</spam>';
                }
            }
            ?>
        </p>

        <button class="login-btn" type="submit" name="login-submit">Log-in</button>
        
        <div class="separator">or</div>
        <div class="divider"></div>

        <div class="additional">
            Don't have an account?
            <a href="components/signup.php">Sign-up</a>
        </div>
        <div class="additional">
            <!-- Here create the form which starts the password recovery process! -->
            <a href="components/reset-pwd.php">* Forgot password?</a>
        </div>

    </form>
</div>