// Information tag on home page
let information = (session) => {

    var infoWrapper = document.querySelector('.home-wrapper');
    var infoContainer = document.querySelector('.home-container');
    if(session === "display"){

        window.setTimeout(() => {

            infoContainer.style.display = "none";
            infoWrapper.style.display = "none";

            session_info('none');
        }, 8000);
    }
    else if(session === "none"){

        infoWrapper.style.display = "none";
        infoContainer.style.display = "none";

    }
}

// Sesion info
function session_info(infoWrapper){
   
    $.ajax({
        url: "../includes/session.inc.php",
        type: "POST",
        data: "info=" + infoWrapper,
        dataType: "json",
        success:function(response){
            console.log(response);
        },
        error: function(error) {
           console.log(error);
        }
    });

}

// Animation for the background
window.addEventListener('load', function () {
   
    if(session_value_animation === "anim-display"){
        document.querySelector('input[name=animation]').checked = true;

        // Animations
        animate_effect();
    }

    
    information(session_value_info);
    

}, false);


document.querySelector('input[name=animation]').addEventListener('change', function() {
    if(this.checked) {
        trans_animation();        
        session_animation('anim-display');
    } else {
        trans_animation();
        session_animation('anim-non');
    }

    // Animations
    animate_effect();
})

let trans_animation = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition');
    }, 1000);
}

// Sesion anim-set
function session_animation(animation){
   
    $.ajax({
        url: "../includes/session.inc.php",
        type: "POST",
        data: "animation=" + animation,
        dataType: "json",
        success:function(response){
            console.log(response);
        },
        error: function(error) {
           console.log(error);
        }
    }

    );
}

// Particles
function animate_effect(){
    var elementParticles = document.getElementById('particles-animation');
    var animationParticles = document.getElementById('particles-effect');

    var elementBouncing = document.getElementById('bouncing-animation');
    var animationBoucing = document.getElementById('bouncing-effect');    

    var elementClouds = document.getElementById('clouds-animation');
    var animationClouds = document.getElementById('clouds-effect');

    if(elementParticles.checked && document.querySelector('input[name=animation]').checked){
        animationParticles.style.display = "block";
        animationBoucing.style.display = "none";        
        animationClouds.style.display = "none";
    }
    else if(elementBouncing.checked && document.querySelector('input[name=animation]').checked){
        animationParticles.style.display = "none";
        animationBoucing.style.display = "block";
        animationClouds.style.display = "none";
    }
    else if(elementClouds.checked && document.querySelector('input[name=animation]').checked){
        animationParticles.style.display = "none";
        animationBoucing.style.display = "none";
        animationClouds.style.display = "block";
    }
    else{
        animationParticles.style.display = "none";
        animationBoucing.style.display = "none";
        animationClouds.style.display = "none";
    }
} 


