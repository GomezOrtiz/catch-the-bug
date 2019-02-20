function Stinkbug(game, x) {
    Character.call(this,game,x)
    
    this.h = 134
    
    this.speedX = 1

    this.img = new Image()
    this.img.src = "img/stinkbug.png"

    this.health = 75
    this.healthDivider = 1.5
    this.goldValue = 100

    this.init(x)
}

Stinkbug.prototype = Object.create(Character.prototype)
Stinkbug.prototype.constructor = Stinkbug