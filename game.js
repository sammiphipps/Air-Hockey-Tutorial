const canvas = document.querySelector('#table')
const boardWidth = canvas.width
const boardHeight = canvas.height
const boardCenterX = boardWidth / 2
const boardCenterY = boardHeight / 2
const ctx = canvas.getContext('2d')

let controllers = []
const goalHeight = 100
const goalWidth = 200
// const goalPosTop = (boardHeight - goalHeight) / 2
const goalPosTopX = boardWidth / 3.3
let score = [];

ctx.lineWidth = 2
canvas.focus()

const board = () => {
    ctx.beginPath()
    ctx.arc(boardWidth / 2, boardHeight / 2, boardWidth / 10, 0, 2 * Math.PI)
    ctx.moveTo(0, boardHeight / 2)
    ctx.lineTo(boardWidth, boardHeight / 2)
    ctx.rect((boardWidth / 3.3), 0, goalWidth, goalHeight)
    ctx.rect((boardWidth / 3.3), (boardHeight - goalHeight), goalWidth, goalHeight)
    ctx.stroke()
}

const moveController = (key) => {

    // Up
    if (key === 38 && controller.velocityY < controller.maxSpeed) {
            controller.velocityY -= controller.acceleration;
    }

    // Down
    if (key === 40 && controller.velocityY < controller.maxSpeed) {
            controller.velocityY += controller.acceleration;
    }

    // Right
    if (key === 39 && controller.velocityX < controller.maxSpeed) {
            controller.velocityX += controller.acceleration;
    }

    // Left 
    if (key === 37 && controller.acceleration < controller.maxSpeed) {
            controller.velocityX -= controller.acceleration;
    }

}

const rotate = (x, y, sin, cos, reverse) => {
    return {
            x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
            y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
    };
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
        
            if (controller.y > (boardCenterY - controller.radius) && controller.y < boardCenterY) {
                    controller.velocityY = -3;
            }

            if (controllerTwo.y > boardCenterY && controllerTwo.y < (boardCenterY + (controllerTwo.radius / 2))) {
                    controllerTwo.velocityY = +3;
            } 

    },

    this.keepPuckInBoard = () => {

            if (this.x > (boardWidth - this.radius) || this.x < this.radius) {

                    if (this.x > (boardWidth - this.radius)) {
                            this.x = boardWidth - this.radius;
                    } else {
                            this.x = this.radius;
                    }

                    this.velocityX = -this.velocityX;

            }

            if (this.y > (boardHeight - this.radius) || this.y < this.radius) {

                if (this.y > (boardHeight - this.radius)) {
                        this.y = boardHeight - this.radius;
                } else {
                        this.y = this.radius;
                }

                if (this.x > (goalPosTopX + puck.radius) && this.x < (goalPosTopX + goalWidth) - puck.radius){
                        puck = new Disc()

                } else {
                        this.velocityY = -this.velocityY
                }
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
            ctx.shadowColor = 'rgba(50, 50, 50, 0.25)';
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 3;
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = this.color;
            ctx.fill();

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

                    if ((puck.y + puck.radius) < controllerTwo.y) {
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

document.addEventListener('keydown', event => {
    moveController(event.keyCode)
})

let puck = new Disc() 

const updateGame = () => {

    ctx.clearRect(0, 0, boardWidth, boardHeight);

    board() 

    puck.draw();
    puck.move();
    puck.discCollision();
    puck.keepPuckInBoard();

    controller.draw();
    controller.move();
    controller.keepControllerInBoard();
    controllerTwo.draw();
    controllerTwo.computerPlayer();
    controllerTwo.move();
    controllerTwo.keepControllerInBoard();

    requestAnimationFrame(updateGame);
}

let controller = new Disc()
controller.color = "blue"
controller.radius += 10
controller.acceleration = 5
controller.startingPosX = boardCenterX
controller.startingPosY = 200
controller.mass = 50
controller.x = controller.startingPosX;
controller.y = controller.startingPosY

let controllerTwo = new Disc();
controllerTwo.color = "red"
controllerTwo.radius += 10
controllerTwo.acceleration = 0.2
controllerTwo.startingPosX = boardCenterX
controllerTwo.startingPosY = (boardHeight - 200)
controllerTwo.mass = 50
controllerTwo.x = controllerTwo.startingPosX
controllerTwo.y = controllerTwo.startingPosY


controllers.push(controller, controllerTwo);

updateGame();
