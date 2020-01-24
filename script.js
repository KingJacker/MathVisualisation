// USING BIGNUMBER LIB 
// DOCUMENTATION: http://jsfromhell.com/classes/bignumber


// INITIALISING CANVAS
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// RESET BUTTON
function resetBtn() {
    Ball0.reset()
    Ball1.reset()
    Ball2.reset()
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    count = 0;
}

function apply() {
    Ball0.reset()
    Ball1.reset()
    Ball2.reset()
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Ball0.mod = eval(document.getElementById("angleModBall0").value);
    Ball1.mod = eval(document.getElementById("angleModBall1").value);
    Ball2.mod = eval(document.getElementById("angleModBall2").value);
}


// CLASS FOR CREATING BALLS THAT ROTATE
class Ball {
    constructor(color, ballRadius, radius) {
        this.x0 = 400;
        this.y0 = 400;
        this.color = color;
        this.ballRadius = ballRadius;
        this.clearTime = 0;
        this.angle = new BigNumber(0);
        this.radius = radius;
        this.angleManipulation = 1;
        this.mod;
    }
    
    // CALCULATES THE NEW X/Y POSITIONS WITH THE CENTER AND ANGLE
    rotate(xOrigin, yOrigin) {
        var radians = (Math.PI / 180) * this.angle;
            if (this.angle > 359) {this.angle = 0}
            if (this.angle < -359) {this.angle = 0}
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        var nx = this.radius * cos + xOrigin;
        var ny = this.radius * sin + yOrigin;
        return [nx, ny];
    }

    // DRAWS BALL ONTO CANVAS
    drawBall() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }
    
    reset() {
        this.angle = 0;
    }
}

// ATTACHES BALL1 TO THE COORDINATES OF BALL0 ...
function move(mod0, mod1, mod2) {
        
    Ball0.x = Ball0.rotate(Ball0.x0, Ball0.y0)[0];
    Ball0.y = Ball0.rotate(Ball0.x0, Ball0.y0)[1];
    
    Ball1.x = Ball1.rotate(Ball0.x, Ball0.y)[0];
    Ball1.y = Ball1.rotate(Ball0.x, Ball0.y)[1];

    Ball2.x = Ball2.rotate(Ball1.x, Ball1.y)[0];
    Ball2.y = Ball2.rotate(Ball1.x, Ball1.y)[1];

    console.log([Ball0.angle, Ball1.angle, Ball2.angle])
    // CHANGING ANGLE
    Ball0.angle = Ball0.angle + (mod0);
    Ball1.angle = Ball1.angle + (mod1);
    Ball2.angle = Ball2.angle + (mod2);
}

// CREATING BALL OBJECTS
var Ball0 = new Ball("#0000cc", 5, 100); 
var Ball1 = new Ball("#cc0000", 5, 100);
var Ball2 = new Ball("#00cc00", 5, 100);


var count = 0
function draw() {

    // CLEAR CANVAS TO REMOVE TRACERS
    if (document.getElementById("clearPaths").checked == true){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    // MAKES MOVEMENT
    move(Ball0.mod, Ball1.mod, Ball2.mod);
    
    // DRAWS ALL THE BALLS
    Ball0.drawBall();
    Ball1.drawBall();
    Ball2.drawBall();

    count++
    document.getElementById("counter").textContent = count;
    if (document.getElementById("continuous").checked == false) {
        if (count == 360) {
            return;
        }
    }

}


// RUNS THE FUNCTION DRAW EVERY MILLISECOND (TO CREATE FLUENCY)
running = false;
function run() {
    if (running == false) {
        running = true;
        setInterval(function() {draw();},1);
    } else {
        running = false;
        resetBtn()
        return;
    }
}




document.getElementById("angleModBall0").value = "-1";
document.getElementById("angleModBall1").value = "+1/2";
document.getElementById("angleModBall2").value = "+3/5";

console.log("Js Loaded");
