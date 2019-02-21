function Tower(game, x, y, minX, maxX, minY, maxY) {
    this.game = game
    
    this.minX = minX
    this.maxX = maxX
    this.minY = minY
    this.maxY = maxY

    this.x = x
    this.y = y

    this.init()

}

Tower.prototype.init = function () {

    this.img = new Image()
    this.img.src = ""
    this.img.frames = 3
    this.img.frameIndex = 0
    this.direction = ""
    this.bullets = []
    this.upgradable = false
    this.drawable = false
   
    this.upImg = new Image()
    this.upImg.src = "img/upgrade_south2.png"

}

Tower.prototype.getDirection = function () {
    if (this.y < 100){
        this.direction = "S"
        this.img.src = this.imgSouth
    } else {
        this.direction = "N"
        this.img.src = this.imgNorth
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
    
    this.canUpgrade()
    this.drawUpdate()
    
    this.bullets = this.bullets.filter(function(bullet) {
        return  (bullet.direction === "N" && (bullet.y > (279 - (134 / 2) + 20))) || 
                (bullet.direction === "S" && ((bullet.y + bullet.h) < (279 - (134 / 2))))
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
                var bullet = new Bullet(this.game, (this.x + this.w / 2 - 15), this.y, (this.game.enemies[i].x + this.game.enemies[i].w), (this.game.enemies[i].y + this.game.enemies[i].h), this.damage, this.direction, this.bulletImg)
                this.bullets.push(bullet)
                this.attackAnimation()
                if (this.bulletImg === "img/bulletgreen3.png" || this.bullet === "img/bulletgreen2.png"){
                    shootLaser.play()
                } else {
                    shoot.play()
                }
                break
            }
        }
    }        
}

Tower.prototype.upgradeListener = function (e) {

    if (this.minX < e.clientX && this.maxX > e.clientX && this.minY < e.clientY && this.maxY > e.clientY){
        this.upgrade()
    }

}

Tower.prototype.canUpgrade = function () {

    if (this.game.gold >= this.upgradeValue && this.level < 3){
        this.upgradable = true
    } else {
        this.upgradable = false
    }

    if (this.upgradable) {
        if (this.direction === "N"){
            this.upImg.src = "img/upgrade_south2.png"
        } else {
            this.upImg.src = "img/upgrade2.png"
        }
    } else {
        if (this.direction === "N"){
            this.upImg.src = "img/no_upgrade2.png"
        } else {
            this.upImg.src = "img/no_upgrade_south2.png"
        }
    }
   
}

Tower.prototype.drawUpdate = function () {
    if (this.drawable){
        if (this.direction === "N"){
            this.game.ctx.drawImage(this.upImg, this.x + 25, this.y + this.h -20, 90, 37)
            this.game.ctx.font = "12px georgia"
            this.game.ctx.fillStyle = "white"
            this.game.ctx.fillText(this.upgradeValue, this.x + 90,this.y + this.h + 6)
        } else {
            this.game.ctx.drawImage(this.upImg, this.x + 25, this.y -15, 90, 37)
            this.game.ctx.font = "12px georgia"
            this.game.ctx.fillStyle = "white"
            this.game.ctx.fillText(this.upgradeValue, this.x + 90,this.y + 2)
        }
    }
    
}

