function Bullet(game, x, y, charX, charY, damage, direction) {
    this.game = game
  
    this.x = x
    this.y = y

    this.targetX = charX
    this.targetY = charY 
    this.direction = direction

    this.w = 20
    this.h = 20
    
    this.speedX = 1.5
    this.speedY = 1.5

    this.hit = false
    this.damage = damage
  
    this.img = new Image()
    this.img.src = "img/bullet.png"

    this.getY()
  }

Bullet.prototype.getY = function () {
    if (this.direction === "S"){
        this.y += 100
    }
}

Bullet.prototype.draw = function() {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
}

Bullet.prototype.move = function() {
    if (this.direction === "N"){
        if (this.x > this.targetX - 40){
            this.x -= this.speedX
        } else {
            this.x += this.speedX
        }
        if (this.y > ((this.game.h / 2) -70)){
            this.y -= this.speedY
        }
    } else {
        if (this.x > this.targetX - 40){
            this.x -= this.speedX
        } else {
            this.x += this.speedX
        }
        if (this.y < (this.game.h / 2 + 30)){
            this.y += this.speedY
        }
    }
    
}