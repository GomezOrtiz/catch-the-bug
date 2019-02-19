function Starbeetle(game, x) {
    Character.call(this,game,x)
    
    this.h = 133
    
    this.speedX = 1.5

    this.img = new Image()
    this.img.src = "img/starbeetle.png"

    this.health = 250
    this.goldValue = 200

    this.init(x)
}

Starbeetle.prototype = Object.create(Character.prototype)
Starbeetle.prototype.constructor = Starbeetle