// Define canvas
const canvas = document.getElementById("particles-effect");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
let numberOfParticles = (canvas.height * canvas.width) / 5000;

// Initialize the possition of the mouse
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/120) * (canvas.width/120),
}

window.addEventListener('mousemove', 
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

// Create particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    // Method to draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);        
        ctx.fillStyle = 'rgb(70, 70, 83)';
        ctx.fill();
    }
    
    // Check particle position, check mouse position,
    // move the particle, draw the particle
    update() {
        // Check if particle is still winthin canvas
        if(this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if(this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Check collision detection
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);

        if(distance < mouse.radius + this.size){
            if(mouse.x < this.x && this.x < canvas.width - this.size * 10){
                this.x += 10;
            }   
            if(mouse.x > this.x && this.x > this.size * 10){
                this.x -= 10;
            }
            if(mouse.y < this.y && this.y < canvas.height - this.size * 10){
                this.y += 10;
            }
            if(mouse.y > this.y && this.y > this.size * 10){
                this.y -= 10;
            }
        }

        // Move particle
        this.x -= this.directionX;
        this.y += this.directionY;
        
        // Draw particle
        this.draw();
    }
    
} 

// Create particle array
async function init() {
    particlesArray = [];

    for(let i = 0; i < numberOfParticles; i++){
        let size = (Math.random() * 1) + 1;
        
        // Make sure that the partilces are not stuck
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        
        let directionX = (Math.random() * 3) - 2.5;
        let directionY = (Math.random() * 3) - 2.5;
        let color = 'rgb(70, 70, 83)';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Check if particles are close enough to draw line between them
async function connect() {
    let opacityValue = 1; 

    for(let a = 0; a < particlesArray.length; a++){
        for(let b = a; b < particlesArray.length; b++){
            let distance = (( particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)
             + ( particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            if(distance < (canvas.width/7) * (canvas.height/7)){
                opacityValue = 1 - (distance/20000);
                ctx.strokeStyle = 'rgb(70, 70, 83, ' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
async function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
    }

    connect();
}

// Resize event
window.addEventListener('resize',
    function (){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas.height/80) * (canvas.height/80));
        
        if(canvas.width < 1224){
            numberOfParticles = (canvas.height * canvas.width) / 8000;
        }
        else{
            numberOfParticles = (canvas.height * canvas.width) / (100 * mouse.radius);
        }   

        init();
        
    }
);

// Mouse out event
window.addEventListener('mouseout', 
    function(){
        mouse.x = undefined;
        mouse.y = undefined;
    }, 1000
);

// Mobile
window.addEventListener('touchend', 
    function(){
        mouse.x = undefined;
        mouse.y = undefined;
    }, 1000
);

init();
animate(); 





