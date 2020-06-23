const board = (ctx, w, h) => {
    ctx.beginPath()
    ctx.arc(w / 2, h / 2, w / 10, 0, 2 * Math.PI)
    ctx.moveTo(0, h / 2)
    ctx.lineTo(w, h / 2)
    ctx.stroke()
}

window.addEventListener("DOMContentLoaded", event => {
    const canvas = document.querySelector("#table")
    const w = canvas.width
    const h = canvas.height
    const ctx = canvas.getContext('2d')
    ctx.lineWidth = 2
    board(ctx, w, h)
})


