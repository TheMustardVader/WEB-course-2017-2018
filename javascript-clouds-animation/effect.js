// Define canvas
const canvas = document.getElementById("effect");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let cloudsArray;
const cloudsColor = 'black';

// Range of the animation
const maxSize = 40;
const minSize = 0;
const mouseRadius = 60;

// Initialize the possition of the mouse
let cloudsMouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', 
    function(event){
        cloudsMouse.x = event.x;
        cloudsMouse.y = event.y;
    }
);

// Create particle
function cloudsParticle (x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
}

// Method to draw individual particle
cloudsParticle.prototype.cloudsDraw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);        
    ctx.fillStyle = this.color;
    ctx.fill();
}
    
// Check particle position, check mouse position,
// move the particle, draw the particle
cloudsParticle.prototype.update = function() {

    // Check if particle is still winthin canvas
    if(this.x + this.size*2 > canvas.width || this.x - this.size*2 < 0) {
        this.directionX = -this.directionX;
    }
    if(this.y + this.size*2 > canvas.height || this.y - this.size*2 < 0) {
        this.directionY = -this.directionY;
    }

    // Move particle
    this.x += this.directionX;
    this.y += this.directionY;
    
    // Interact with the cloudsMouse
    if (cloudsMouse.x - this.x < mouseRadius && cloudsMouse.x - this.x > -mouseRadius 
        && cloudsMouse.y - this.y < mouseRadius && cloudsMouse.y - this.y > -mouseRadius){
            if (this.size < maxSize){
                this.size += 3;
            }
    } else if(this.size > minSize){
        this.size -= 0.5;
    }

    if(this.size < 0){
        this.size = 0;
    }

    this.cloudsDraw()
}

// Create particle array
function cloudsInit() {
    cloudsArray = [];

    let numberOfClouds = 1000;

    for(let i = 0; i < numberOfClouds; i++){
        let size = 0;
        // Make sure that the partilces are not stuck
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;

        cloudsArray.push(new cloudsParticle(x, y, directionX, directionY, size, cloudsColor));
    }
}

// Animation loop
function cloudsAnimate() {
    requestAnimationFrame(cloudsAnimate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for(let i = 0; i < cloudsArray.length; i++){
        cloudsArray[i].update();
    }    
}

// Resize event
window.addEventListener('resize',
    function (){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        
        cloudsInit();
    }
);

// Remove mouse position periodically
setInterval(function() {
    cloudsMouse.x = undefined;
    cloudsMouse.y = undefined;
}, 1000);

cloudsInit();
cloudsAnimate();