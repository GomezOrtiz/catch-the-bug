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