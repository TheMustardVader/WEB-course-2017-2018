// Theme mode 

window.addEventListener('load', function () {
   
    console.log(session_value_theme);
    if(session_value_theme === "dark"){
        document.querySelector('input[name=theme]').checked = true;
     }

    document.documentElement.setAttribute('data-theme', session_value_theme);

}, false);


document.querySelector('input[name=theme]').addEventListener('change', function() {
    if(this.checked) {
        trans_theme();
        document.documentElement.setAttribute('data-theme', 'dark');
        session_theme('dark');
    } else {
        trans_theme();
        document.documentElement.setAttribute('data-theme', 'light');
        session_theme('light');
    }
})

let trans_theme = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}

// Sesion theme-set
function session_theme(theme){
   
    $.ajax({
        url: "../includes/session.inc.php",
        type: "POST",
        data: "mode=" + theme,
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
