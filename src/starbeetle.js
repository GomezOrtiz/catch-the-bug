function Starbeetle(game, x) {
    Character.call(this,game,x)
    
    this.w = 120
    this.h = 133
    
    this.speedX = 2

    this.img = new Image()
    this.img.src = "img/starbeetle.png"

    this.health = 200
    this.goldValue = 150

    this.init(x)
}

Starbeetle.prototype = Object.create(Character.prototype)
Starbeetle.prototype.constructor = Starbeetle