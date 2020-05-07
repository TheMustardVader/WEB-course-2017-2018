

// Checkbox
var checkbox = document.querySelector('input[name=theme]');

// Onload
window.addEventListener('load', function () {
   
    if(session_value === "dark"){
        checkbox.checked = true;
    }

    document.documentElement.setAttribute('data-theme', session_value);

}, false);



checkbox.addEventListener('change', function() {
    if(this.checked) {
        trans();
        document.documentElement.setAttribute('data-theme', 'dark');
        session('dark');
    } else {
        trans();
        document.documentElement.setAttribute('data-theme', 'light');
        session('light');
    }
})

let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}

// Sesion theme-set
function session(theme){
   
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