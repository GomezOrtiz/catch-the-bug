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

Button.prototype.buttonListener = function (e) {

    if(e.screenY > 587 && e.screenY < 620){
        if(e.screenX > 745 && e.screenX < 785){
            this.game.enemySelection = 1
            console.log(this.game.enemySelection)
        } else if (e.screenX > 797 && e.screenX < 831) {
            this.game.enemySelection = 2
            console.log(this.game.enemySelection)
        }
    }

}