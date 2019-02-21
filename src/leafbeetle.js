function Leafbeetle(game, x) {
    Character.call(this,game,x)
    
    this.h = 148
    
    this.speedX = 2.5

    this.img = new Image()
    this.img.src = "img/leafbeetle.png"

    this.health = 350
    this.healthDivider = 5
    this.goldValue = 300

    this.init(x)
}

Leafbeetle.prototype = Object.create(Character.prototype)
Leafbeetle.prototype.constructor = Leafbeetle