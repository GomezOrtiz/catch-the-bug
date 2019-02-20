function Zombie(game, x) {
    Character.call(this,game,x)
    
    this.h = 134
    this.w = 144
    
    this.speedX = 1

    this.img = new Image()
    this.img.src = "img/zombie_sprite.png"

    this.health = 2000
    this.healthDivider = 20
    this.goldValue = 0


    this.init(x)
}

Zombie.prototype = Object.create(Character.prototype)
Zombie.prototype.constructor = Zombie