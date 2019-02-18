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
        this.towers = []
        this.wave = 0
        this.start()
    },

    waves: [
        {ladybugs:1},
        {ladybugs:2},
        {starbeetles:1,ladybugs:2},
        {starbeetles:1,ladybugs:3},
        {starbeetles:2,ladybugs:3},
        {leafbeetles:1,starbeetles:2,ladybugs:2},
        {leafbeetles:2,starbeetles:2,ladybugs:2},
        {leafbeetles:2,starbeetles:4,ladybugs:2},
        {leafbeetles:4,starbeetles:2,ladybugs:2},
        {leafbeetles:4,starbeetles:4,ladybugs:4},
    ],

    targets: [
        {minX:300,maxX:365,minY:230,maxY:290,x:130,y:50},
        {minX:460,maxX:525,minY:230,maxY:290,x:290,y:50},
        {minX:620,maxX:685,minY:230,maxY:290,x:450,y:50},
        {minX:780,maxX:845,minY:230,maxY:290,x:610,y:50},
        {minX:940,maxX:1005,minY:230,maxY:290,x:770,y:50},

        {minX:220,maxX:285,minY:430,maxY:490,x:50,y:270},
        {minX:380,maxX:445,minY:430,maxY:490,x:210,y:270},
        {minX:540,maxX:600,minY:430,maxY:490,x:370,y:270},
        {minX:700,maxX:765,minY:430,maxY:490,x:530,y:270},
        {minX:860,maxX:925,minY:430,maxY:490,x:690,y:270},
        {minX:1020,maxX:1085,minY:430,maxY:490,x:850,y:270}
    ],

    start: function () {

        this.setListeners()

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

    setListeners: function () {
        document.onmouseup = function (e) {

            if (this.gold >= 500){
                var target = this.targets.filter(function(target) {
                    return target.minX < e.screenX && target.maxX > e.screenX && target.minY < e.screenY && target.maxY > e.screenY
                })

                if (target.length > 0){
                    var newTower = new Tower(this,target[0].x,target[0].y)
                    this.towers.push(newTower)
                    this.gold -= 500
                }
            }
        }.bind(this)
    },

    pushWave: function (wave) {
        var counter = 0
        for (var i = 0; i < this.waves[wave].leafbeetles; i++){
            var newEnemy = new Leafbeetle (this, counter*-150)
            this.enemies.push(newEnemy)
            counter++
        }
        for (var i = 0; i < this.waves[wave].starbeetles; i++){
            var newEnemy = new Starbeetle (this, counter*-150)
            this.enemies.push(newEnemy)
            counter++
        }
        for (var i = 0; i < this.waves[wave].ladybugs; i++){
            var newEnemy = new Ladybug (this, counter*-150)
            this.enemies.push(newEnemy)
            counter++
        }
    },

    reset: function () {
        this.framesCounter = 0;
        this.gold = 500
        this.wave = 0
        this.enemies = []
        this.towers = []
        this.lives = 3
        this.background = new Background(this)
        this.scoreGold = new ScoreGold(this)
        this.scoreLives = new ScoreLives(this)
    },

    stop: function () {
        clearInterval(this.interval)
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
        this.towers.forEach (function (tower) {
            tower.draw()
        }.bind(this))
    },

    moveAll: function () {
        this.enemies.forEach (function (enemy) {
            enemy.move()
        }.bind(this))
    },

    attackAll: function () {
        this.towers.forEach (function (tower) {
            tower.attack()
        }.bind(this))
    },

    isHit: function () {
        this.towers.forEach (function (tower){
            tower.bullets.forEach(function (bullet) {
                if (bullet.hit === false && bullet.direction === "N"){
                    this.enemies.forEach (function (enemy) {
                        if (
                            ((enemy.x + enemy.w) > bullet.x &&
                            enemy.x < (bullet.x + bullet.w) &&
                            enemy.y + (enemy.h - 55) > bullet.y
                            )
                        ) {
                            bullet.hit = true
                            enemy.receiveDamage(bullet.damage)
                        }
                    }.bind(this))
                }
                if (bullet.hit === false && bullet.direction === "S"){
                    this.enemies.forEach (function (enemy) {
                        if (
                            ((enemy.x + enemy.w) > bullet.x &&
                            enemy.x < (bullet.x + bullet.w) &&
                            (enemy.y + 55) < (bullet.y + bullet.h)
                            )
                        ) {
                            bullet.hit = true
                            enemy.receiveDamage(bullet.damage)
                        }
                    }.bind(this))
                }
            }.bind(this));
        }.bind(this))
    },

    isGameOver: function () {
        this.enemies.forEach(function (enemy){
            if (enemy.x > this.w){
                this.lives -= 1
                this.enemies.splice(this.enemies.indexOf(enemy),1)
            }
            if (this.lives === 0){
                this.stop()
    
                if (confirm("GAME OVER. Play again?")) {
                  this.reset()
                  this.start()
                }
            }
        }.bind(this))
    }
}