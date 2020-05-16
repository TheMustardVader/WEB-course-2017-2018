<!-- Separate file for the navigation content -->

<?php

    /* Check if the user is logged in, if not then redirect him to login page */
    if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
        header("location: ../index.php");
        exit;
    }
    $json_theme = $_SESSION['theme'];
    $json_animation = $_SESSION['display'];
    $session_info = $_SESSION['info'];

?>

<header>
    <nav>
        <div class="nav-menu">    
            <div class="logo">
                <a href=""> <i class="fa fa-circle-thin" aria-hidden="true"></i></a>
            </div>
        
            <ul class="nav-links">

                <div class="pay">                
                        <li>
                            <img src="../resources/media/coffee.png"/>
                            <a class="tea" href="payment.php">Buy me a coffee</a>
                        </li>
                </div>

                <li class="settings-drop-wrapper">
                    <a class="label-drop" href="#">Settings</a>
                    <div class="settings-drop">
                        <a href="../includes/logout.inc.php">Log-out</a>
                    </div>
                </li>

                <li class="view-drop-wrapper">
                    <a class="label-drop" href="#">Presets</a>
                    <div class="view-drop">
                        <label class='radio-label'>
                            <input name='radio-animation' type='radio' id='particles-animation' checked="checked" onclick='animate_effect()'>
                            <span class='inner-label'>Particles</span>
                        </label>
                        <label class='radio-label'>
                            <input name='radio-animation' type='radio' id='bouncing-animation' onclick='animate_effect()'>
                            <span class='inner-label'>Bouncing</span>
                        </label>
                        <label class='radio-label'>
                            <input name='radio-animation' type='radio' id='clouds-animation' onclick='animate_effect()'>
                            <span class='inner-label'>Clouds</span>
                        </label>                        
                    </div>
                </li>

                <div class="switch">                
                    <li>
                        <input type="checkbox" id="switch-animation" name="animation" /> 
                        <label class="label-toggle" for="switch-animation">Toggle</label>                                      
                    </li> 
                    <li>
                        <a href="">Animation</a>    
                    </li>
                </div>
                
                <div class="switch">                
                    <li>
                        <input type="checkbox" id="switch-theme" name="theme" /> 
                        <label class="label-toggle" for="switch-theme">Toggle</label>                                      
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

<canvas id="particles-effect" class="canvas-container" ></canvas>
<canvas id="bouncing-effect" class="canvas-container" ></canvas>
<canvas id="clouds-effect" class="canvas-container" ></canvas>

<script>

    var session_value_theme = '<?php echo $json_theme; ?>';
    var session_value_animation = '<?php echo $json_animation; ?>';
    var session_value_info = '<?php echo $session_info; ?>';

</script>

<!-- JavaScript -->
<script type="text/javascript" src="../resources/javascript/navigation.js"></script>

<script type="text/javascript" src="../resources/javascript/theme.js"></script>

<script type="text/javascript" src="../resources/javascript/animation.js"></script>

<script type="text/javascript" src="../resources/javascript/particles-effect.js"></script>

<script type="text/javascript" src="../resources/javascript/bouncing-effect.js"></script>

<script type="text/javascript" src="../resources/javascript/clouds-effect.js"></script>

