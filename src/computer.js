function Computer(game) {
    this.game = game

    this.left = new Image()
    this.left.src = "img/computer_left.png"

    this.right = new Image ()
    this.right.src = "img/computer_right.png"

    this.overcharging = false 
    
    this.right.frames = 3
    this.right.frameIndex = 0

    this.left.frames = 3
    this.left.frameIndex = 0

    this.w = 170
    this.h = 170

}

Computer.prototype.overcharge = function () {
    if (this.overcharging) {

        this.left.src = "img/computerL_sprite.png"
        this.right.src = "img/computerR_sprite.png"

    }
}

Computer.prototype.drawLeft = function () {
    if (!this.overcharging) {
        this.game.ctx.drawImage(this.left, this.game.w - 170, this.game.h / 2 - 115 , this.w, this.h)
    }
}

Computer.prototype.drawRight = function () {
    if (!this.overcharging) {
        this.game.ctx.drawImage(this.right, this.game.w - 170, this.game.h / 2 - 115 , this.w, this.h)
    }
}

Computer.prototype.overchargeLeft = function () {
    if (this.overcharging){
        this.game.ctx.drawImage(
            this.left,
            this.left.frameIndex * Math.floor(this.left.width / this.left.frames),
            0,
            Math.floor(this.left.width / this.left.frames),
            this.left.height,
            this.game.w - 170,
            this.game.h / 2 - 115,
            this.w,
            this.h
        )
        this.animateLeft()
    }

}

Computer.prototype.overchargeRight = function () {
    if (this.overcharging){
        this.game.ctx.drawImage(
            this.right,
            this.right.frameIndex * Math.floor(this.right.width / this.right.frames),
            0,
            Math.floor(this.right.width / this.right.frames),
            this.right.height,
            this.game.w - 170,
            this.game.h / 2 - 115,
            this.w,
            this.h
        )
        this.animateRight() 
    }
}

Computer.prototype.animateLeft = function() {
    if (this.game.framesCounter % 6 === 0) {
        this.left.frameIndex += 1
    
        if (this.left.frameIndex > 2) this.left.frameIndex = 0
    }
}

Computer.prototype.animateRight = function() {
    if (this.game.framesCounter % 6 === 0) {
        this.right.frameIndex += 1
    
        if (this.right.frameIndex > 2) this.right.frameIndex = 0
    }
}