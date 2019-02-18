var Game = {
    w: 1000,
    h: 500,
    fps: 60,

    init: function(id) {
        this.canvas = document.getElementById(id)
        this.ctx = this.canvas.getContext("2d")
        this.canvas.width = this.w
        this.canvas.height = this.h
        this.lives = 3
        this.enemies = []
        this.wave = 1
        this.start()
    },

    waves : {
        1: [1],
        2: [2],
        3: [3]
    },

    start: function () {

        this.reset()

        this.pushWave(this.wave)

        this.interval = setInterval(function () {
            this.clear()

            this.framesCounter++;

            if (this.framesCounter > 1000) {
                this.framesCounter = 0
            }

            this.moveAll()
            this.drawAll()
            this.attackAll()

            this.isHit()
            this.isGameOver()
            
            if (this.enemies.length === 0){
                this.wave++
                this.pushWave(this.wave)
            }

        }.bind(this), 1000 / this.fps)
    },

    pushWave: function (wave) {
        for (var i = 0; i < this.waves[wave]; i++){
            var newEnemy = new Character (this, i*-150)
            this.enemies.push(newEnemy)
        }
    },

    reset: function () {
        this.framesCounter = 0;
        this.gold = 0
        this.wave = 1
        this.enemies = []
        this.lives = 3
        this.background = new Background(this)
        this.scoreGold = new ScoreGold(this)
        this.scoreLives = new ScoreLives(this)
        this.tower = new Tower(this)
    },

    clear: function () {
        this.ctx.clearRect(0, 0, this.w, this.h)
    },

    drawAll: function () {
        this.background.draw()
        this.scoreGold.draw()
        this.scoreLives.draw()
        this.enemies.forEach (function (enemy) {
            enemy.draw()
        }.bind(this))
        this.tower.draw()
    },

    moveAll: function () {
        this.enemies.forEach (function (enemy) {
            enemy.move()
        }.bind(this))
    },

    attackAll: function () {
        this.tower.attack()
    },

    isHit: function () {
        
        return this.tower.bullets.some(function (bullet) {
            if (bullet.hit === false){
                this.enemies.forEach (function (enemy) {
                    if (
                        ((enemy.x + enemy.w) > bullet.x &&
                        enemy.x < (bullet.x + bullet.w) &&
                        enemy.y + (enemy.h - 40) > bullet.y)
                    ) {
                        bullet.hit = true
                        enemy.receiveDamage(bullet.damage)
                        this.enemies.forEach(function (enemy) {
                            if (enemy.isDead){
                                setTimeout(function(){ 
                                    this.enemies.splice(this.enemies.indexOf(enemy),1)
                                    this.gold += enemy.goldValue
                                }.bind(this), 500);
                            }
                        }.bind(this))
                        return true
                    }
                }.bind(this))
               
            }
        }.bind(this));
    },

    isGameOver: function () {
        this.enemies.forEach(function (enemy){
            if (enemy.x > this.w + 10){
                this.lives -= 1
            }
        })
    }
}