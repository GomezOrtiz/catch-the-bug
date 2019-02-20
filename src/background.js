function Background(game) {
    this.game = game
  
    this.img = new Image()
    this.img.src = 'img/bg4.png'

    this.x = 0
    this.y = 0
  
}

Background.prototype.draw = function() {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.game.w, this.game.h)
}

function Computer(game) {
    this.game = game

    this.img = new Image()
    this.img.src = "img/computer.png"

    this.overcharging = false 
    
    this.img.frames = 3
    this.img.frameIndex = 0

    this.w = 170
    this.h = 170

}

Computer.prototype.draw = function() {
    if (!this.overcharging) {
        this.game.ctx.drawImage(this.img, this.game.w - 170, this.game.h / 2 - 115 , 170, 170)
    }
}

Computer.prototype.overcharge = function () {
    if (this.overcharging) {

        this.img.src = "img/computer_sprite2.png"

        this.game.ctx.drawImage(
            this.img,
            this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
            0,
            Math.floor(this.img.width / this.img.frames),
            this.img.height,
            this.game.w - 170,
            this.game.h / 2 - 115,
            this.w,
            this.h
        )
        this.animateImg()    
    }
}

Computer.prototype.animateImg = function() {
    if (this.game.framesCounter % 6 === 0) {
        this.img.frameIndex += 1
    
        if (this.img.frameIndex > 2) this.img.frameIndex = 0
    }
}