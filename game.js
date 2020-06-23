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

const animate = () => {
    ctx.clearRect(0, 0, w, h)
    board()
    player.draw()
    requestAnimationFrame(animate)
}

animate()


