const canvas = document.querySelector('#table')
const boardWidth = canvas.width
const boardHeight = canvas.height
const boardCenterX = boardWidth / 2
const boardCenterY = boardHeight / 2
const ctx = canvas.getContext('2d')
ctx.lineWidth = 2

const board = () => {
    ctx.beginPath()
    ctx.arc(boardWidth / 2, boardHeight / 2, boardWidth / 10, 0, 2 * Math.PI)
    ctx.moveTo(0, boardHeight / 2)
    ctx.lineTo(boardWidth, boardHeight / 2)
    ctx.stroke()
}

function Disc () {

    this.startingPosX = boardCenterX;
    this.startingPosY = boardCenterY;
    this.x = this.startingPosX;
    this.y = this.startingPosY;
    this.radius = 34;
    this.mass = 15;
    this.velocityX = 0;
    this.velocityY = 0;
    this.maxSpeed = 10;
    this.frictionX = 0.997;
    this.frictionY = 0.997;
    this.acceleration = 1;
    this.color = '#000000';

    this.keepControllerInBoard = () => {
        
            if (this.x > (boardWidth - this.radius) || this.x < this.radius) {

                if (this.x < this.radius) {
                          this.velocityX = 2;
                    } else {
                            this.velocityX = -2;
                    }
            }

            if (this.y > (boardHeight - this.radius) || this.y < this.radius) {

                    if (this.y < this.radius) {
                          this.velocityY = 2;
                    } else {
                            this.velocityY = -2;
                    }

            }
        
            if (controller.x > (boardCenterX - controller.radius) && controller.x < boardCenterX) {
                    controller.velocityX = -3;
            }

            if (controllerTwo.x > boardCenterX && controllerTwo.x < (boardCenterX + (controllerTwo.radius / 2))) {
                    controllerTwo.velocityX = +3;
            } 
    },

    this.keepPuckInBoard = () => {

            if (this.x > (boardWidth - this.radius) || this.x < this.radius) {

                    if (this.x > (boardWidth - this.radius)) {
                            this.x = boardWidth - this.radius;
                    } else {
                            this.x = this.radius;
                    }

                    if (this.y > (goalPosTop + puck.radius) && this.y < (goalPosTop + goalHeight) - puck.radius) {
                            puck = new Disc(boardCenterX, boardCenterY);
                    } else {
                            this.velocityX = -this.velocityX;
                    }
            }

            if (this.y > (boardHeight - this.radius) || this.y < this.radius) {

                    if (this.y > (boardHeight - this.radius)) {
                            this.y = boardHeight - this.radius;
                    } else {
                            this.y = this.radius;
                    }
                    
                    this.velocityY = -this.velocityY;
            }

    }

    this.discCollision = () => {

            for (var i = 0; i < controllers.length; i++) {
                
                    var distanceX = this.x - controllers[i].x,
                            distanceY = this.y - controllers[i].y,
                            distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY),
                            addedRadius = this.radius + controllers[i].radius;
		
                    if (distance < addedRadius) {
                            var angle = Math.atan2(distanceY, distanceX),
                                    sin = Math.sin(angle),
                                    cos = Math.cos(angle),
                                    pos0 = {
                                            x: 0,
                                            y: 0
                                    },
                                    pos1 = rotate(distanceX, distanceY, sin, cos, true),
                                    vel0 = rotate(controllers[i].velocityX, controllers[i].velocityY, sin, cos, true),
                                    vel1 = rotate(this.velocityX, this.velocityY, sin, cos, true),
                                    velocityXTotal = vel0.x - vel1.x;

                            vel0.x = ((controllers[i].mass - this.mass) * vel0.x + 2 * this.mass * vel1.x) /
                                    (controllers[i].mass + this.mass);
                            vel1.x = velocityXTotal + vel0.x;

                            var absV = Math.abs(vel0.x) + Math.abs(vel1.x),
                                    overlap = (controllers[i].radius + this.radius) - Math.abs(pos0.x - pos1.x);

                            pos0.x += vel0.x / absV * overlap;
                            pos1.x += vel1.x / absV * overlap;

                            var pos0F = rotate(pos0.x, pos0.y, sin, cos, false),
                                    pos1F = rotate(pos1.x, pos1.y, sin, cos, false);

                            this.x = controllers[i].x + pos1F.x;
                            this.y = controllers[i].y + pos1F.y;
                            controllers[i].x = controllers[i].x + pos0F.x;
                            controllers[i].y = controllers[i].y + pos0F.y;

                            var vel0F = rotate(vel0.x, vel0.y, sin, cos, false),
                                    vel1F = rotate(vel1.x, vel1.y, sin, cos, false);

                            controllers[i].velocityX = vel0F.x;
                            controllers[i].velocityY = vel0F.y;

                            this.velocityX = vel1F.x;
                            this.velocityY = vel1F.y;

                    }
            }

    }

    this.draw = () => {
            boardContext.shadowColor = 'rgba(50, 50, 50, 0.25)';
            boardContext.shadowOffsetX = 0;
            boardContext.shadowOffsetY = 3;
            boardContext.shadowBlur = 6;
            boardContext.beginPath();
            boardContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            boardContext.fillStyle = this.color;
            boardContext.fill();

    }

    this.move = () => {
            this.velocityX *= this.frictionX;
            this.velocityY *= this.frictionY;
            this.x += this.velocityX;
            this.y += this.velocityY;
    }

    this.computerPlayer = () => {        
            if (puck.x > (boardCenterX - 30) && controllerTwo.x > (boardCenterX + controllerTwo.radius * 2)) {
                    if ((puck.x + puck.radius) < controllerTwo.x) {
                          controllerTwo.velocityX -= controllerTwo.acceleration;
                    } else {
                            controllerTwo.velocityX += controllerTwo.acceleration;
                    }

                    if (puck.y < controllerTwo.y) {
                            controllerTwo.velocityY -= controllerTwo.acceleration;
                    } else {
                            controllerTwo.velocityY += controllerTwo.acceleration;
                    }

            } else {

                    if (controllerTwo.x > (controllerTwo.startingPosX - 50) && controllerTwo.x < (controllerTwo.startingPosX + 50)) {
                            controllerTwo.velocityX = 0;
                    } else if (controllerTwo.x < (controllerTwo.startingPosX - 80)) {
                            controllerTwo.velocityX += controllerTwo.acceleration;
                    } else {
                            controllerTwo.velocityX -= controllerTwo.acceleration;
                    }

            }

    }

};


const puck = new Disc() 

console.log(puck)
// class Player {
//     constructor() {
//         this.x = undefined
//         this.y = undefined
//         this.prevX = undefined
//         this.prevY = undefined
//         this.dx = undefined
//         this.dy = undefined
//     }

//     draw(){
//         ctx.beginPath()
//         ctx.arc(this.x, this.y, boardWidth * .05, 0, 2 * Math.PI)
//         ctx.fillStyle = "red"
//         ctx.fill()
//         ctx.stroke()
//     }

//     update() {
//         this.dx = this.x - this.prevX
//         this.dy = this.y - this.prevY
//         this.prevX = this.x
//         this.prevY = this.y
//     }
// }

// const player = new Player()

// window.addEventListener('mousemove', event => {
//     player.x = event.x - window.innerWidth / 2 + w / 2
//     player.y = event.y - h * .05
// })

// const animate = () => {
//     ctx.clearRect(0, 0, boardWidth, h)
//     board()
//     player.draw()
//     requestAnimationFrame(animate)
// }

// animate()

board()

