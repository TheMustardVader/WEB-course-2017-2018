// Toggle Nav
document.querySelector('.burger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('nav-active');
    
    //Burger animation  
    document.querySelector('.burger').classList.toggle('toggle');
});
document.querySelector('.nav-links').addEventListener('mouseleave', () => {
    document.querySelector('.nav-links').classList.toggle('nav-active');
    
    //Burger animation  
    document.querySelector('.burger').classList.remove('toggle');
});

// Animate Links
document.querySelectorAll('.nav-links li').forEach((link, index) => {
    if(link.style.animation){
        link.style.animation = '';
    }
    else{
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
    }   
});

