// Define canvas
const boucingCanvas = document.getElementById("boucing-particles-effect");
const boucingCtx = boucingCanvas.getContext('2d');

boucingCanvas.width = window.innerWidth;
boucingCanvas.height = window.innerHeight;

let boucingParticlesArray = [];
const boucingNumberOfParticles = 200;

// Initialize the possition of the boucingMouse
let boucingMouse = {
    x: null,
    y: null,
    radius: 3
}

window.addEventListener('mousemove', 
    function(event){
        boucingMouse.x = event.x;
        boucingMouse.y = event.y;
    }
);

setInterval(function(){
    boucingMouse.x = undefined;
    boucingMouse.y = undefined;
}, 200);

// Create particle
class boucingParticle {
    constructor(x, y, size, color, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
    }

    // Method to boucingDraw individual particle
    boucingDraw() {
        boucingCtx.beginPath();
        boucingCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);     
        boucingCtx.fillStyle = this.color;
        boucingCtx.fill();
    }
    
    // Check particle position, check boucingMouse position,
    // move the particle, boucingDraw the particle
    boucingUpdate() {
        this.size -= 0.05;
        if(this.size < 0){
            this.x = (boucingMouse.x + ((Math.random() * 20) - 10));
            this.y = (boucingMouse.y + ((Math.random() * 20) - 10));
            this.size = (Math.random() * 10) + 5;
            this.weight = (Math.random() * 2) - 0.5;
        }
        this.y += this.weight;
        this.weight += 0.2;

        if(this.y > boucingCanvas.height - this.size){
            this.weight *= -1;
        }
    }
}

async function boucingInit(){
    boucingParticlesArray = [];
    for(let i = 0; i < boucingNumberOfParticles; i++ ){

        let x = Math.random() * boucingCanvas.width;
        let y = Math.random() * boucingCanvas.height;
        let size = (Math.random() * 10) + 2;
        let color = 'rgb(70, 70, 83)';
        let weight = 1;
        boucingParticlesArray.push(new boucingParticle(x, y, size, color, weight));
    
    }
}

// Check if particles are close enough to boucingDraw line between them
async function boucingConnect() {
    let opacityValue = 1; 

    for(let a = 0; a < boucingParticlesArray.length; a++){
        for(let b = a; b < boucingParticlesArray.length; b++){
            let distance = (( boucingParticlesArray[a].x - boucingParticlesArray[b].x) * (boucingParticlesArray[a].x - boucingParticlesArray[b].x)
             + ( boucingParticlesArray[a].y - boucingParticlesArray[b].y) * (boucingParticlesArray[a].y - boucingParticlesArray[b].y));

            if(distance < (boucingCanvas.width/5) * (boucingCanvas.height/5)){
                opacityValue = 1 - (distance/10000);
                boucingCtx.strokeStyle = 'rgb(70, 70, 83, ' + opacityValue + ')';
                boucingCtx.lineWidth = 1;
                boucingCtx.beginPath();
                boucingCtx.moveTo(boucingParticlesArray[a].x, boucingParticlesArray[a].y);
                boucingCtx.lineTo(boucingParticlesArray[b].x, boucingParticlesArray[b].y);
                boucingCtx.stroke();
            }
        }
    }
}

async function boucingAnimate() {
    boucingCtx.clearRect(0, 0, boucingCanvas.width, boucingCanvas.height);
    for(let i = 0; i < boucingParticlesArray.length; i++){
        boucingParticlesArray[i].boucingUpdate();
    }
    boucingConnect();
    requestAnimationFrame(boucingAnimate);
}

// Resize event
window.addEventListener('resize',
    function (){
        boucingCanvas.width = innerWidth;
        boucingCanvas.height = innerHeight;
        
        
        if(boucingCanvas.width < 1224){
            boucingMouse.radius = 1;
        }
        
        boucingInit();
        
    }
);

boucingInit();
boucingAnimate();
