// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = screen.width;
console.log(width);
var height = canvas.height = screen.height;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

class Shape{
    constructor(x , y, velX, velY, exists){
        this.x = x;
        this.y = y;
        this.velX =  velX;
        this.velY = velY;
        this.exists = exists;
    }
}

class Ball extends Shape{
    constructor(x ,y , velX, velY , exists,  color , size){
        /* horizontal and vetical coordinates where the ball will start on 
        screen*/
        // this.x = x;
        // this.y = y;
        // /*horizontal and vertical velocity (velX and velY) — each ball is given
        //  a horizontal and vertical velocity; in real terms these values will be 
        //  regularly added to the x/y coordinate values when we start to animate the
        //   balls, to move them by this much on each frame.*/
        // this.velX = velX;
        // this.velY = velY;

        super(x , y , velX, velY, exists);
        this.color = color;
        this.size = size;
    }
        draw(){
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y , this.size, 0, 2 * Math.PI);
            ctx.fill();
        }

        update(){
            if((this.x + this.size)> width){
                this.velX = -(this.velX);
            }
            if((this.x - this.size) < 0){
                this.velX = -(this.velX);
            }
            if((this.y + this.size) > height){
                this.velY = -(this.velY);
            }
            if((this.y - this.size) < 0){
                this.velY = -(this.velY);
            }

            this.x += this.velX;
            this.y += this.velY;

        }

        collisionDetect(){
            for (var j = 0; j < balls.length; j++) {
                if (!(this === balls[j])) {
                  var dx = this.x - balls[j].x;
                  var dy = this.y - balls[j].y;
                  var distance = Math.sqrt(dx * dx + dy * dy);
            
                  if (distance < this.size + balls[j].size) {
                    balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
                  }
                }
            }
        }
    
}

class EvilCircle extends Shape(){
    constructor(x ,y , velX, velY , exists , color, size ){
        super(x ,y , velX, velY , exists);

        this.color = color;
        this.size = size;
    }
}

// var testBall = new Ball (50, 100, 4, 4, 'red', 10);
// testBall.draw();

var balls = [];

function loop(){
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0,0, width, height);

    while(balls.length < 25){
        var size = random(10, 20);
        var ball = new Ball (
            random(0 + size, width - size),
            random(0 + size, height - size),
            random(-7, 7),
            random(-7, 7),
            true,
            'rgb(' + random(0, 255) + ',' + random(0,255) + ',' + random(0,255) + ')',
            size 

        );

        balls.push(ball);
    }

    for(var i = 0; i< balls.length; i++){
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}

loop();