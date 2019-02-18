function Ladybug(game, x) {
    Character.call(this,game,x)
    
    this.w = 120
    this.h = 134
    
    this.speedX = 1.5

    this.img = new Image()
    this.img.src = "img/ladybug.png"

    this.health = 100
    this.goldValue = 100

    this.init(x)
}

Ladybug.prototype = Object.create(Character.prototype)
Ladybug.prototype.constructor = Ladybug