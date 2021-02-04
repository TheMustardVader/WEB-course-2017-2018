// Define canvas
const canvas = document.getElementById("effect");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 200;

// Initialize the possition of the mouse
let mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', 
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

setInterval(function(){
    mouse.x = undefined;
    mouse.y = undefined;
}, 200);

// Create particle
class Particle {
    constructor(x, y, size, color, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
    }

    // Method to draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);     
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    
    // Check particle position, check mouse position,
    // move the particle, draw the particle
    update() {
        this.size -= 0.05;
        if(this.size < 0){
            this.x = (mouse.x + ((Math.random() * 20) - 10));
            this.y = (mouse.y + ((Math.random() * 20) - 10));
            this.size = (Math.random() * 5) + 5;
            this.weight = (Math.random() * 2) - 0.5;
        }
        this.y += this.weight;
        this.weight += 0.2;

        if(this.y > canvas.height - this.size){
            this.weight *= -1;
        }
    }
}

async function init(){
    particlesArray = [];
    for(let i = 0; i < numberOfParticles; i++ ){

        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = (Math.random() * 5) + 2;
        let color = 'black';
        let weight = 1;
        particlesArray.push(new Particle(x, y, size, color, weight));
    
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
                opacityValue = 1 - (distance/10000);
                ctx.strokeStyle = 'rgba(0, 0, 0, ' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

async function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        //particlesArray[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
}

init();
animate();