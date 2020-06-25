const canvas = document.querySelector('#table')
const boardWidth = canvas.width
const boardHeight = canvas.height
const ctx = canvas.getContext('2d')
ctx.lineWidth = 2

const board = () => {
    ctx.beginPath()
    ctx.arc(boardWidth / 2, boardHeight / 2, boardWidth / 10, 0, 2 * Math.PI)
    ctx.moveTo(0, boardHeight / 2)
    ctx.lineTo(boardWidth, boardHeight / 2)
    ctx.stroke()
}
function Disc (radius, color) {
    this.startingPosX = boardWidth / 2
    this.startingPosY = boardHeight / 2
    this.x = this.startingPosX
    this.y = this.startingPosY
    this.radius = radius
    this.mass = 15
    this.velocityX = 0
    this.velocityY = 0
    this.maxSpeed = 10
    this.frictionX = 0.997
    this.frictionY = 0.997
    this.acceleration = 1
    this.color = color

    this.keepControllerInBoard = () => {
        if (this.x > (boardWidth - this.radius) || this.x < this.radius) {
            if (this.x < this.radius) {
                this.velocityX = 2
            } else {
                this.velocityX = -2
            }
        }

        if (this.y > (boardHeight - this.radius) || this.y < this.radius) {
            if (this.y < this.radius){
                this.velocityY = 2
            } else {
                this.velocityY = -2
            }
        }

        if (controller.x > ((boardWidth / 2) - controller.radius) && controller.x < (boardWidth / 2)){
            controller.velocityX = -3
        }

        if(controllerTwo.x > (boardWidth / 2) && controllerTwo.x < ((boardWidth / 2) + (controllerTwo.radius / 2))){
            controllerTwo.velocityX = +3
        }
    } 

    this.keepPuckInBoard = () => {
        if (this.x > (boardWidth - this.radius) || this.x < this.radius) {
            if (this.x > (boardWidth - this.radius)) {
                this.x = boardWidth - this.radius
            } else {
                this.x = this.radius
            }

            if (this.y > (goalPosTop + puck.radius) && this.y < (goalPosTop + goalHeight) - puck.radius) {
                puck = new Disc(boardWidth / 11, 'black')
            } else {
                this.velocityX = -this.velocityX
            }
        }

        if (this.y > (boardHeight - this.radius) || this.y < this.radius) {
            if (this.y > (boardHeight - this.radius)){
                this.y = boardHeight - this.radius
            } else {
                this.y = this.radius
            }

            this.velocityY = -this.velocityY
        }
    }
}

const puck = new Disc(boardWidth / 11, 'black') 

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

