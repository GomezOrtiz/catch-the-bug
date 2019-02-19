function Leafbeetle(game, x) {
    Character.call(this,game,x)
    
    this.w = 120
    this.h = 148
    
    this.speedX = 2.5

    this.img = new Image()
    this.img.src = "img/leafbeetle.png"

    this.health = 200
    this.goldValue = 250

    this.init(x)
}

Leafbeetle.prototype = Object.create(Character.prototype)
Leafbeetle.prototype.constructor = Leafbeetle