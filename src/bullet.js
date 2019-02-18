function Bullet(game, x, y, charX, charY, damage) {
    this.game = game
  
    this.x = x
    this.y = y

    this.targetX = charX
    this.targetY = charY 

    this.w = 20
    this.h = 20
    
    this.speedX = 0.5
    this.speedY = 0.5

    this.hit = false
    this.damage = damage
  
    this.img = new Image()
    this.img.src = "img/bullet.png"

  }

Bullet.prototype.draw = function() {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
}

Bullet.prototype.move = function() {
    if (this.x > this.targetX - 40){
        this.x -= this.speedX
    } else {
        this.x += this.speedX
    }
    if (this.y > ((this.game.h / 2) -70)){
        this.y -= this.speedY
    }
}