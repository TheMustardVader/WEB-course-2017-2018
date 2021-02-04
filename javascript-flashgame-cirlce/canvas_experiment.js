
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var score = 0;
    var maxSpeed = 7;
    //balls of the canvas
    var ballRadius = 25;
    var x = canvas.width/2;
    var xball = x;
    var y = canvas.height-30;
    var yball = y;
    var speedOfballs = 1.8;
    var vspeedOfballs = 1.8;
    var dx = speedOfballs;
    var velocityX = vspeedOfballs;
    var dy = -speedOfballs;
    var velocityY = -vspeedOfballs;
    //gift 
    var xgift = x;
    var ygift = y;
    var velocityXgift = speedOfballs;
    var velocityYgift = speedOfballs;
    var giftCount = 0;
    var gift = 0;
    //health
    var recRadius = 35;
    var xh = x;
    var yh = y;
    var velocityXh = speedOfballs;
    var velocityYh = speedOfballs;
    var healthCount = 0;
    var lives = 3;
    //paddle variables
    var paddleHeight = 15;
    var paddleWidth = 200;
    var paddleX = (canvas.width-paddleWidth)/2;
    var rightPressed = false;
    var leftPressed = false;
    //bricks
    var createBricksCounter = 1;
    var brickRowCount = 9;
    var brickColumnCount = 7;
    var brickWidth = 120;
    var brickHeight = 40;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 20;
    var bricks = [];
    var i = 0;
    //color
    var color = [
    		"#e6e600","#3366ff","#00cc66",
    		"#99cc00","#008ae6","#00e68a",
    		"#40ff00","#6666ff","#669900",
    		"#ccff66","#008ae6","#00e68a"
    ];
    var colorOfBall = color[Math.floor(Math.random() * 5)];
    var colorOfBrix = color[Math.floor(Math.random() * 5)];
    var colorOfPaddle = color[Math.floor(Math.random() * 5)];
    
    function createBricks(){
        for(c=0; c<brickColumnCount; c++) {
            bricks[c] = [];
            for(r=0; r<brickRowCount; r++) {
                bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

    function keyDownHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = true;
        }
        else if(e.keyCode == 37) {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = false;
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
        }
    }

    function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth/2;
        }
    }

    function collisionDetectionBall() {
        for(c=0; c<brickColumnCount; c++) {
            for(r=0; r<brickRowCount; r++) {
                var b = bricks[c][r];
                if(b.status == 1) {
                    if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
                        dy = -dy;
                        b.status = 0;
                        score ++;
                        //LIVES
                        if(score % 6 == 0 && healthCount == 0 && lives < 3){
                            healthCount++;
                            xh = x;
                            yh = y;
                        }
                        //GIFT
                        if(score % 20 == 1 && giftCount == 0){
                            giftCount++;
                            xgift = x;
                            ygift = y;
                        }
                        //FAKE BALL
                        if(score % 12 == 0 &&  i == 0){
                           i++;
                           xball = x;
                           yball = y;
                            vspeedOfballs += 0.2;                      
                            velocityX = vspeedOfballs;
                            velocityY = -vspeedOfballs;
                        }
                        //COLORS
                        colorOfBrix = color[Math.floor(Math.random() * 5)];
                        colorOfPaddle = color[Math.floor(Math.random() * 5)];
                        colorOfBall = color[Math.floor(Math.random() * 5)];
                        //MY BALL
                        if(speedOfballs < maxSpeed)
                        speedOfballs += 0.05;
                    	dx = speedOfballs;
   						dy = -speedOfballs; 
                        var result = createBricksCounter != 0 ? createBricksCounter*(brickRowCount*brickColumnCount) : (brickRowCount*brickColumnCount);   
                        if(score ==  result + (gift * 50)) {
                            alert("YOU WIN, CONGRATS!");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }


    function drawFakeCircle(){
        ctx.beginPath();
        ctx.arc(xball, yball, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = colorOfBall;
        ctx.fill();
        ctx.closePath();
    }

    function drawHealthStore(){
        ctx.beginPath();
        ctx.rect(xh,yh,recRadius,recRadius);
        ctx.stroke();
        ctx.closePath();
    }
    function drawGift(argument) {
        ctx.beginPath();
        ctx.arc(xgift,ygift, ballRadius, 0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();    
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = colorOfBall;
        ctx.fill();
        ctx.closePath();
    }
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = colorOfPaddle;
        ctx.fill();
        ctx.closePath();
    }
    function drawBricks() {
        for(c=0; c<brickColumnCount; c++) {
            for(r=0; r<brickRowCount; r++) {
                if(bricks[c][r].status == 1) {
                    var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = colorOfBrix;
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
    function drawScore() {
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Score: "+score, 8, 20);
    }
    function drawLives() {
        ctx.font = "20px Arial";
        ctx.fillStyle = 'black';
        ctx.fillText("Lives: "+lives, canvas.width-80, 20);
    }
    function myBallDraw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();
        collisionDetectionBall();
       
        //DRAW MY BALL
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if(y + dy < ballRadius) {
            dy = -dy;
        }
        else if(y + dy > canvas.height-ballRadius) {
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                lives--;
                if(i > 0)i--;
                if(!lives) {
                    alert("GAME OVER");
                    document.location.reload();
                }else{
                    score = 0;
                    x = canvas.width/2;
                    y = canvas.height-30;
                    dx = speedOfballs;
                    dy = -speedOfballs;
                    paddleX = (canvas.width-paddleWidth)/2;
                }
            }
        }
        if(rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 12;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 12;
        }

        //DRAW HEALTHSTORE RECTANGLE

        if(healthCount != 0){
            drawHealthStore();
            if(yh + velocityYh > canvas.height-recRadius && xh > paddleX && xh < paddleX + paddleWidth) {
                lives++;
                healthCount = 0;
            }else if(yh + velocityYh >= canvas.height ){
                healthCount = 0;
            }
             yh += velocityYh;
        }

        //DRAW GIFT
        if(giftCount != 0){
            drawGift();
            if(ygift + velocityYgift > canvas.height-ballRadius && xgift > paddleX && xgift < paddleX + paddleWidth) {
                if(i > 0){
                    i--;
                }else{
                    score += 50;
                    gift++;
                }
                 giftCount = 0;
            }else if(ygift + velocityYgift >= canvas.height ){
                giftCount = 0;
            }
             ygift += velocityYgift;
        }

        //DRAW FAKE BALL
        if(i != 0){
            drawFakeCircle();
            if(xball + velocityX > canvas.width-ballRadius || xball + velocityX < ballRadius) {
                    velocityX = -velocityX;
                }
            if(yball + velocityY < ballRadius) {
                    velocityY = -velocityY;
                }
                else if(yball + velocityY > canvas.height-ballRadius) {
                    if(xball > paddleX && xball < paddleX + paddleWidth) {
                        velocityY = -velocityY;
                    }
                    else {
                        lives--;
                        i--;
                        if(!lives) {
                            alert("GAME OVER");
                            document.location.reload();
                        }
                    }
                }
             xball += velocityX;
             yball += velocityY;
        }
          x += dx;
          y += dy;
        //NEW BRICKS
            if( score > createBricksCounter*brickRowCount*brickColumnCount && y > canvas.height/1.5 && createBricksCounter < 4){
                createBricks();
                createBricksCounter++;
            }
        requestAnimationFrame(myBallDraw);
    }
    createBricks();
    myBallDraw();