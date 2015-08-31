
var canvas;
var canvasContext;
var ballX =50;
var ballY =50;

var ballSpeedX =10;
var ballSpeedY =4;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

var player1Score =0;
var player2Score =0;

const WINNING_SCORE = 3;
var winString;
var showingWinScreen = false;
function handleMouseClick(evt){
    if(showingWinScreen){
        showingWinScreen=false;                
        
    }
}
function calculateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return{
        x:mouseX,
        y:mouseY
    }
}
window.onload = function(){
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    
    var framesPerSecond = 1000/30;
    setInterval(function(){
        moveEverything();
        drawEverything();
        
    },framesPerSecond);
    canvas.addEventListener('mousemove',
        function(evt){
            var mousePos = calculateMousePos(evt);
            if(mousePos.y>50 && mousePos.y<550){
                paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
            }
        });
     canvas.addEventListener('mousedown',handleMouseClick);
}
function ballReset(){
    if(player1Score>=WINNING_SCORE){
        winString = "Player 1 wins";
        
        player1Score =-1;
        player2Score =0;
        showingWinScreen = true;
        
    }
    else if(player2Score >= WINNING_SCORE){
        winString = "Player 2 wins";
        
        player1Score =0;
        player2Score =-1;
        showingWinScreen = true;
        
    }
    else{
        ballX = canvas.width/2;
        ballY=canvas.height/2;
        ballSpeedX= -ballSpeedX;
        ballSpeedY = 5;
    }
}
function computerMovement(){
    var paddle2YCenter = paddle2Y +(PADDLE_HEIGHT/2);
        if(paddle2YCenter<ballY -35){
            paddle2Y += 6;
        }
        else if(paddle2YCenter>ballY + 35){
            paddle2Y -= 6;
        }
    
}
function moveEverything(){
    computerMovement();
   if (showingWinScreen){
       return;
   }
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if(ballX >= canvas.width-PADDLE_THICKNESS){
        //ballSpeedX= -ballSpeedX;
        if(ballY>paddle2Y && ballY<paddle2Y+PADDLE_HEIGHT && ballX==(canvas.width-PADDLE_THICKNESS)){
            ballSpeedX= -ballSpeedX;
            
            var deltaY = ballY -(paddle2Y+PADDLE_HEIGHT/2);
            ballSpeedY= deltaY*0.35;
        }else if(ballX>canvas.width){
            player1Score++;
            ballReset();  
        }
    }
    if(ballX <= PADDLE_THICKNESS){
        //ballSpeedX= -ballSpeedX;
        if(ballY>paddle1Y && ballY<paddle1Y+PADDLE_HEIGHT){
            ballSpeedX= -ballSpeedX;
            var deltaY = ballY -(paddle1Y+PADDLE_HEIGHT/2);
            ballSpeedY= deltaY*0.35;
        }else if(ballX<0){
            
            player2Score++;  //must be BEFORE ballReset()
            ballReset();  
        }
    }
    if(ballY > canvas.height){
        ballSpeedY= -ballSpeedY;
    }
    if(ballY < 0){
        ballSpeedY= -ballSpeedY;
    }
    
}
function drawNet(){
    for(var i=0; i<canvas.height; i+=40){
        colorRect(canvas.width/2-1,i,2,20,"white");
    }
}
function drawEverything(){
    
    //create black canvas
    colorRect(0,0,canvas.width,canvas.height,"black");
    if (showingWinScreen){
        canvasContext.fillStyle="white";
        canvasContext.fillText(winString,350,500);
        
        return;
    }
    drawNet();
    //create left paddle
    colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,"white");
    //create left paddle
    colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,"white");
    //create ball
    colorCircle(ballX,ballY,10,"white");
    
    canvasContext.fillText(player1Score,100,100);
    canvasContext.fillText(player2Score,canvas.width-100,100);
}
function colorRect(leftX,topY,width,height,drawColor){
    
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX,topY,width,height);
}
function colorCircle(centerX,centerY,radius,drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
    canvasContext.fill();
}
