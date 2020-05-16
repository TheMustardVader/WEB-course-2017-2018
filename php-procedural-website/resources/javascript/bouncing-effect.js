// Define canvas
const bouncingCanvas = document.getElementById("bouncing-effect");
const bouncingCtx = bouncingCanvas.getContext('2d');

bouncingCanvas.width = window.innerWidth;
bouncingCanvas.height = window.innerHeight;

let bouncingParticlesArray = [];
const bouncingNumberOfParticles = 100;

// Initialize the possition of the bouncingMouse
let bouncingMouse = {
    x: null,
    y: null,
    radius: 3
}

window.addEventListener('mousemove', 
    function(event){
        bouncingMouse.x = event.x;
        bouncingMouse.y = event.y;
    }
);


setInterval(function(){
    bouncingMouse.x = undefined;
    bouncingMouse.y = undefined;
}, 10);

// Create particle
class bouncingParticle {
    constructor(x, y, size, color, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
    }

    // Method to bouncingDraw individual particle
    bouncingDraw() {
        bouncingCtx.beginPath();
        bouncingCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);     
        bouncingCtx.fillStyle = this.color;
        bouncingCtx.fill();
    }
    
    // Check particle position, check bouncingMouse position,
    // move the particle, bouncingDraw the particle
    bouncingUpdate() {
        this.size -= 0.02;
        if(this.size < 0){
            this.x = (bouncingMouse.x + ((Math.random() * 20) - 5));
            this.y = (bouncingMouse.y + ((Math.random() * 20) - 5));
            this.size = (Math.random() * 2) + 1;
            this.weight = (Math.random() * 2) - 0.2;
        }
        this.y += this.weight;
        this.weight += 0.4;

        if(this.y > bouncingCanvas.height - this.size){
            this.weight *= -1;
        }
    }
    
}

async function bouncingInit(){
    bouncingParticlesArray = [];
    for(let i = 0; i < bouncingNumberOfParticles; i++ ){

        let x = Math.random() * bouncingCanvas.width;
        let y = Math.random() * bouncingCanvas.height;
        let size = (Math.random() * 2) + 1;
        let color = 'rgb(70, 70, 83)';
        let weight = 1;
        bouncingParticlesArray.push(new bouncingParticle(x, y, size, color, weight));
    
    }
}

// Check if particles are close enough to bouncingDraw line between them
async function bouncingConnect() {
    let opacityValue = 1; 

    for(let a = 0; a < bouncingParticlesArray.length; a++){
        for(let b = a; b < bouncingParticlesArray.length; b++){
            let distance = (( bouncingParticlesArray[a].x - bouncingParticlesArray[b].x) * (bouncingParticlesArray[a].x - bouncingParticlesArray[b].x)
             + ( bouncingParticlesArray[a].y - bouncingParticlesArray[b].y) * (bouncingParticlesArray[a].y - bouncingParticlesArray[b].y));

            
            if(distance < (bouncingCanvas.width/7) * (bouncingCanvas.height/7)){
                opacityValue = 1 - (distance/1000000);
                bouncingCtx.strokeStyle = 'rgb(70, 70, 83, ' + opacityValue + ')';
                bouncingCtx.lineWidth = 1;
                bouncingCtx.beginPath();
                bouncingCtx.moveTo(bouncingParticlesArray[a].x, bouncingParticlesArray[a].y);
                bouncingCtx.lineTo(bouncingParticlesArray[b].x, bouncingParticlesArray[b].y);
                bouncingCtx.stroke();
            }
        }
    }
}

async function bouncingAnimate() {
    bouncingCtx.clearRect(0, 0, bouncingCanvas.width, bouncingCanvas.height);
    for(let i = 0; i < bouncingParticlesArray.length; i++){
        bouncingParticlesArray[i].bouncingUpdate();
        bouncingParticlesArray[i].bouncingDraw();
    }
   
    bouncingConnect();
    requestAnimationFrame(bouncingAnimate);
}

// Resize event
window.addEventListener('resize',
    function (){
        bouncingCanvas.width = innerWidth;
        bouncingCanvas.height = innerHeight;
        
        
        if(bouncingCanvas.width < 1224){
            bouncingMouse.radius = 1;
        }
        
        bouncingInit();
        
    }
);

// Reset when press radio btn
document.getElementById('bouncing-animation').addEventListener('change', function() {
        bouncingInit();
    }
);

bouncingInit();
bouncingAnimate();
