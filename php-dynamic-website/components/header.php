<!-- Separate file for the navigation content -->

<?php
// Check if the user is logged in, if not then redirect him to login page
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    header("location: ../index.php");
    exit;
}
$json = $_SESSION['theme'];

?>

<header>
    <nav>
        <div class="nav-menu">    
            <div class="logo">
                <a href=""> <i class="fa fa-circle-thin" aria-hidden="true"></i></a>
            </div>
        
            <ul class="nav-links">
                <li>
                    <a href="#">Profile</a>
                </li>
                <li>
                    <a href="#">View</a>
                </li>
                <li>
                    <a href="#">Settings</a>
                </li>
                <li>
                    <a href="../includes/logout.inc.php">Log-out</a>
                </li>
                <div class="switch">
                
                    <li>
                        <input type="checkbox" id="switch" name="theme" /> 
                        <label for="switch">Toggle</label>                                      
                    </li> 
                    <li>
                        <a href="">Light/Dark</a>    
                    </li>
                </div>
            </ul>
        </div>

        <div class="burger">
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
        </div>

    </nav>
</header>

<script>

    var session_value = '<?php echo $json; ?>';

</script>
<!-- JavaScript -->
<script type="text/javascript" src="../resources/javascript/navigation.js"></script>

<script type="text/javascript" src="../resources/javascript/theme.js"></script>