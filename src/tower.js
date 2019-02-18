function Tower(game, x, y) {
    this.game = game
   
    this.x = x
    this.y = y
    this.direction = ""

    this.range = 100
    this.bullets = []
    
    this.img = new Image()
    this.img.src = ""

    this.w = 140
    this.h = 117

    this.damage = 25

    this.img.frames = 3
    this.img.frameIndex = 0
}

Tower.prototype.getDirection = function () {
    if (this.y < 100){
        this.direction = "S"
        this.img.src = "img/tower2.png"
    } else {
        this.direction = "N"
        this.img.src = "img/tower.png"
    }
}

Tower.prototype.draw = function() {
    this.getDirection()
    this.game.ctx.drawImage(
        this.img,
        this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
        0,
        Math.floor(this.img.width / this.img.frames),
        this.img.height,
        this.x,
        this.y,
        this.w,
        this.h
      )
    
    this.bullets = this.bullets.filter(function(bullet) {
        return  (bullet.direction === "N" && (bullet.y > (279 - (134 / 2) + 20))) || 
                (bullet.direction === "S" && ((bullet.y + bullet.h) < (279 - (134 / 2))))
                // (bullet.direction === "N" && bullet.y < 150) ||
                // (bullet.direction === "S" && (bullet.y + bullet.h) > 150)
    }.bind(this))

    this.bullets.forEach(function(bullet) {
        bullet.draw()
        bullet.move()
    }.bind(this))
}

Tower.prototype.attackAnimation = function() {
    if (this.game.framesCounter % 6 === 0) {
        this.img.frameIndex += 1
    
        if (this.img.frameIndex > 2) this.img.frameIndex = 0
    }
}

Tower.prototype.attack = function() {
    if (this.game.framesCounter % 60 === 0){
        for (var i = 0; i < this.game.enemies.length; i++){
            if (!this.game.enemies[i].isDead && this.game.enemies[i].x > this.x - this.range && this.game.enemies[i].x < this.x + this.range){
                var bullet = new Bullet(this.game, (this.x + this.w / 2 - 15), this.y, (this.game.enemies[i].x + this.game.enemies[i].w), (this.game.enemies[i].y + this.game.enemies[i].h), this.damage, this.direction)
                this.bullets.push(bullet)
                this.attackAnimation()
                break
            }
        }
    }        
}

