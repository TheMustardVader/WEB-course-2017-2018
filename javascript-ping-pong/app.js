var WIDTH  = innerWidth - 20, HEIGHT = innerHeight - 20, pi = Math.PI, UpArrow = 38, DownArrow = 40;
var canvas, ctx, keystate;

var player = {
    x: null,
    y: null,
    width:  20,
    height: 150,
    
    update: function() {
        if (keystate[UpArrow]) this.y -= 10;
        if (keystate[DownArrow]) this.y += 10;
        
        this.y = Math.max(Math.min(this.y, HEIGHT - this.height), 0);
    },
    
    drawPong: function() {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
},

ai = {
    x: null,
    y: null,
    width:  20,
    height: 150,
    
    update: function() {
        var desty = ball.y - (this.height - ball.radius)*0.5;
        this.y += (desty - this.y) * 0.1;
        this.y = Math.max(Math.min(this.y, HEIGHT - this.height), 0);
    },
    
    drawPong: function() {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
},

ball = {
    x:   null,
    y:   null,
    vel: null,
    radius:  20,
    speed: 12,
    
    serve: function(radius) {
        var r = Math.random();
        this.x = radius===1 ? player.x+player.width : ai.x - this.radius;
        this.y = (HEIGHT - this.radius)*r;
        var phi = 0.1*pi*(1 - 2*r);
        this.vel = {
            x: radius*this.speed*Math.cos(phi),
            y: this.speed*Math.sin(phi)
        }
    },
    
    update: function() {
        this.x += this.vel.x;
        this.y += this.vel.y;
        
        if (0 > this.y || this.y+this.radius > HEIGHT) {
            var offset = this.vel.y < 0 ? 0 - this.y : HEIGHT - (this.y+this.radius);
            this.y += 2*offset;
            this.vel.y *= -1;
        }
        var AABBIntersect = function(ax, ay, aw, ah, bx, by, bw, bh) {
            return ax < bx+bw && ay < by+bh && bx < ax+aw && by < ay+ah;
        };
        
        var pdle = this.vel.x < 0 ? player : ai;
        if (AABBIntersect(pdle.x, pdle.y, pdle.width, pdle.height,
                this.x, this.y, this.radius, this.radius)
        ) {	
            
            this.x = pdle===player ? player.x+player.width : ai.x - this.radius;
            var n = (this.y+this.radius - pdle.y)/(pdle.height+this.radius);
            var phi = 0.25*pi*(2*n - 1); 
            var smash = Math.abs(phi) > 0.2*pi ? 1.5 : 1;
            this.vel.x = smash*(pdle===player ? 1 : -1)*this.speed*Math.cos(phi);
            this.vel.y = smash*this.speed*Math.sin(phi);
        }
        
        if (0 > this.x+this.radius || this.x > WIDTH) {
            this.serve(pdle===player ? 1 : -1);
        }
    },
    
    drawPong: function() {
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, pi*2);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath();
    }
};

function loopPong() {
    canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

        
    keystate = {};
    document.addEventListener("keydown", function(evt) {
        keystate[evt.keyCode] = true;
    });
    document.addEventListener("keyup", function(evt) {
        delete keystate[evt.keyCode];
    });
    init(); 
    
    var loop = function() {
        update();
        drawPong();
        window.requestAnimationFrame(loop, canvas);
    };
    window.requestAnimationFrame(loop, canvas);
}

function init() {
    player.x = player.width;
    player.y = (HEIGHT - player.height)/2;
    ai.x = WIDTH - (player.width + ai.width);
    ai.y = (HEIGHT - ai.height)/2;
    ball.serve(1);
}

function update() {
    ball.update();
    player.update();
    ai.update();
}

function drawPong() {
    ctx.beginPath();
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "#99ffcc";
    ctx.closePath();
    ctx.save();			
    ball.drawPong();
    player.drawPong();
    ai.drawPong();
    
    var w = 4;
    var x = (WIDTH - w)*0.5;
    var y = 0;
    var step = HEIGHT/20; 
    while (y < HEIGHT) {
        ctx.fillRect(x, y+step*0.25, w, step*0.5);
        y += step;
    }
    ctx.restore();
}

loopPong();