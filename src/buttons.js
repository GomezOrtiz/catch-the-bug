function Button (game, x, src) {
    this.game = game
  
    this.w = 50
    this.h = 50

    this.x = x 
    this.y = this.game.h - 75

    this.img = new Image()
    this.img.src = src
  
}

Button.prototype.draw = function() {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
}

Button.prototype.buttonListener = function (e) {
    console.log(e.screenX)
    console.log(e.screenY)
    if(e.screenY > 565 && e.screenY < 610){
        if(e.screenX > 700 && e.screenX < 750){
            this.game.enemySelection = 1
        } else if (e.screenX > 762 && e.screenX < 810) {
            this.game.enemySelection = 2
        }
    }

}