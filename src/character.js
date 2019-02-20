function Character(game, x) {
    this.game = game
    
    this.w = 120
    this.h = 134

    this.img = new Image()
    this.img.src = "img/ladybug.png"
    
    this.init(x)
}

Character.prototype.init = function (x) {
    this.x = x - this.w - 50
    this.y = 155
    this.isDead = false
    this.goldGiven = false
    this.img.frames = 5
    this.img.frameIndex = 0
}

Character.prototype.draw = function() {
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
    this.drawLife()
    this.animateImg()    
}

Character.prototype.animateImg = function() {
    if (this.game.framesCounter % 6 === 0) {
        this.img.frameIndex += 1
    
        if (this.img.frameIndex > 2) this.img.frameIndex = 0
    }
}

Character.prototype.drawLife = function() {
    this.game.ctx.fillStyle = "green";
    this.game.ctx.fillRect(this.x + 20, this.y + 10, this.health / this.healthDivider, 5);
}

Character.prototype.move = function() {
    this.x += this.speedX
}

Character.prototype.receiveDamage = function (damage) {
    this.health -= damage
    if (this.health <= 0){
        this.isDead = true
        this.game.enemies.splice(this.game.enemies.indexOf(this),1)
        if (!this.goldGiven){
            this.game.gold += this.goldValue
            this.goldGiven = true
        }
    }
}