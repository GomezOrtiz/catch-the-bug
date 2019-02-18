function Tower(game) {
    this.game = game
   
    this.x = 210
    this.y = 270

    this.range = 100
    this.bullets = []
    
    this.img = new Image()
    this.img.src = "img/tower.png"

    this.w = 140
    this.h = 117

    this.damage = 50

    this.img.frames = 3
    this.img.frameIndex = 0
}

Tower.prototype.draw = function() {
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
        return bullet.y - bullet.h > (this.game.h / 2 - 30)
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
                var bullet = new Bullet(this.game, (this.x + this.w / 2 - 15), this.y, (this.game.enemies[i].x + this.game.enemies[i].w), (this.game.enemies[i].y + this.game.enemies[i].h), this.damage)
                this.bullets.push(bullet)
                this.attackAnimation()
                break
            }
        }
    }        
}

