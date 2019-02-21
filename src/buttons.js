function Button (game, x, src) {
    this.game = game
  
    this.w = 70
    this.h = 65

    this.x = x 
    this.y = this.game.h - 90

    this.img = new Image()
    this.img.src = src
  
}

Button.prototype.draw = function(color) {

    if (color === "purple" && this.game.gold < 250){
        this.img.src = "img/buy_purple3off.png"
    } else if (color === "purple") {
        this.img.src = "img/buy_purple3.png"
    }

    if (color === "green" && this.game.gold < 500){
        this.img.src = "img/buy_green3off.png"
    } else if (color === "green") {
        this.img.src = "img/buy_green3.png"
    }

    this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
}

Button.prototype.buttonListener = function (e) {
    if(e.clientY > 445 && e.clientY < 510){
        if(e.clientX > 740 && e.clientX < 812){
            if (this.game.gold >= 250){
                this.game.enemySelection = 1
                coin.play()
                document.querySelector("body").style.cursor = "cell"
            }
        } else if (e.clientX > 820 && e.clientX < 890) {
            if (this.game.gold >= 500){
                this.game.enemySelection = 2
                coin.play()
                document.querySelector("body").style.cursor = "cell"
            }
        }
    }

}