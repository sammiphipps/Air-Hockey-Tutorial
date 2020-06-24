const canvas = document.querySelector('#table')
const w = canvas.width
const h = canvas.height
const ctx = canvas.getContext('2d')
ctx.lineWidth = 2

const board = () => {
    ctx.beginPath()
    ctx.arc(w / 2, h / 2, w / 10, 0, 2 * Math.PI)
    ctx.moveTo(0, h / 2)
    ctx.lineTo(w, h / 2)
    ctx.stroke()
}

class Player {
    constructor() {
        this.x = undefined
        this.y = undefined
        this.prevX = undefined
        this.prevY = undefined
        this.dx = undefined
        this.dy = undefined
    }

    draw(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, w * .05, 0, 2 * Math.PI)
        ctx.fillStyle = "red"
        ctx.fill()
        ctx.stroke()
    }

    update() {
        this.dx = this.x - this.prevX
        this.dy = this.y - this.prevY
        this.prevX = this.x
        this.prevY = this.y
    }
}

const player = new Player()

window.addEventListener('mousemove', event => {
    player.x = event.x - window.innerWidth / 2 + w / 2
    player.y = event.y - h * .05
})

class Puck {
    constructor() {
        this.x = w / 2
        this.y = h / 2
        this.dx = 5
        this.dy = 5
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, w * .04, 0, 2 * Math.PI)
        ctx.fillStyle = "black"
        ctx.fill()
        ctx.stroke()
    }

    update() {
        this.x += this.dx
        this.y += this.dy

        const a = Math.abs(this.x - player.x)
        const b = Math.abs(this.y - player.y)
        const c = Math.sqrt(a**2 + b**2)

        if (this.x + w * .04 > w || this.x - w * .04 < 0){
            this.dx *= -1
        }

        if (this.y + w * .04 > h || this.y - w * .04 < 0){
            this.dy *= -1
        }

        if (c < w * .04 + w * .05){
            player.dx === 0 ? this.dx *= -1 : this.dx += player.dx * .5
            player.dy === 0 ? this.dy *= -1 : this.dy += player.dy * .5

        }

        Math.sign(this.dx) === 1 ? this.dx -= .1 : this.dx += .1
        Math.sign(this.dy) === 1 ? this.dy -= .1 : this.dy += .1
    }
}

const puck = new Puck()

const animate = () => {
    ctx.clearRect(0, 0, w, h)
    board()
    player.draw()
    puck.draw()
    requestAnimationFrame(animate)
}

animate()


