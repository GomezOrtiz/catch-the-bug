function Ladybug(game, x) {
    Character.call(this,game,x)
    
    this.h = 134
    
    this.speedX = 1.25

    this.img = new Image()
    this.img.src = "img/ladybug.png"

    this.health = 125
    this.healthDivider = 2
    this.goldValue = 150

    this.init(x)
}

Ladybug.prototype = Object.create(Character.prototype)
Ladybug.prototype.constructor = Ladybug