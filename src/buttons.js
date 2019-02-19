function Button (game, x, src) {
    this.game = game
  
    this.w = 50
    this.h = 50

    this.x = x 
    this.y = this.game.h - 60

    this.img = new Image()
    this.img.src = src
  
}

Button.prototype.draw = function() {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
}

