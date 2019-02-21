var Game = {
    w: 1140,
    h: 500,
    fps: 60,
    level: 1,

    init: function(id) {
        this.canvas = document.getElementById(id)
        this.ctx = this.canvas.getContext("2d")
        this.canvas.width = this.w
        this.canvas.height = this.h
        this.start()
    },
    
    start: function () {

        this.reset()

        this.setListeners()

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
            
            if (this.enemies.length === 0 && this.wave < waves[this.level].length){
                console.log(waves[this.level].length)
                this.wave++
                this.pushWave(this.wave)
            } else if (this.wave === waves[this.level].length) {
                this.stop()
                setTimeout(function() { 
                    win.style.display = "block"
                    canvas.style.display = "none"
                }.bind(this), 200)
            }    

        }.bind(this), 1000 / this.fps)
    },
    
    reset: function () {
        this.framesCounter = 0;
        switch (this.level){
            case 0:
            this.lives = 5
            break
            case 1:
            this.lives = 4
            break
            case 2:
            this.lives = 3
            break
        }
        this.wave = 0
        this.gold = 500
        this.enemies = []
        this.towers = []
        this.enemySelection = 0
        this.background = new Background(this)
        this.computer = new Computer(this)
        this.scoreGold = new ScoreGold(this)
        this.scoreLives = new ScoreLives(this)
        this.purpleBtn = new Button(this,this.w - 470, "img/buy_purple3.png")
        this.greenBtn = new Button (this, this.w - 390, "img/buy_green3.png")
    },

    stop: function () {
        clearInterval(this.interval)
    },

    setListeners: function () {

        window.onclick = function (e) {

                var target = targets.filter(function(target) {
                    return target.minX < e.clientX && target.maxX > e.clientX && target.minY < e.clientY && target.maxY > e.clientY
                })

                if (target.length > 0 && target[0].tower === false){
                        if (this.enemySelection === 1){
                            if (this.gold >= 250) {
                                var newTower = new PurpleMonster(this,target[0].x,target[0].y,target[0].minX,target[0].maxX,target[0].minY,target[0].maxY)
                                this.towers.push(newTower)
                                this.gold -= 250
                                target[0].tower = true
                                document.querySelector("body").style.cursor = "pointer"
                                this.enemySelection = 0
                            }
                        }
                        else if (this.enemySelection === 2) {
                            if (this.gold >= 500) {
                                var newTower = new GreenMonster(this,target[0].x,target[0].y,target[0].minX,target[0].maxX,target[0].minY,target[0].maxY)
                                this.towers.push(newTower)
                                this.gold -= 500
                                target[0].tower = true
                                document.querySelector("body").style.cursor = "pointer"
                                this.enemySelection = 0
                            }
                        }
                } else {
                    this.towers.forEach(function(tower) {
                        tower.upgradeListener(e)
                    })

                    this.purpleBtn.buttonListener(e)
                }
        
        }.bind(this)

        window.onmousemove = function (e) {

            this.towers.forEach (function (tower) {
                if (tower.minX < e.clientX && tower.maxX > e.clientX && tower.minY < e.clientY && tower.maxY > e.clientY){
                    tower.drawable = true
                } else {
                    tower.drawable = false                
                }
            }.bind(this))

        }.bind(this)
    },

    pushWave: function (wave) {
        var counter = 0
        for (var i = 0; i < waves[this.level][wave].zombies; i++){
            var newEnemy = new Zombie (this, counter*-150)
            this.enemies.push(newEnemy)
            counter++
        }
        for (var i = 0; i < waves[this.level][wave].leafbeetles; i++){
            var newEnemy = new Leafbeetle (this, counter*-150)
            this.enemies.push(newEnemy)
            counter++
        }
        for (var i = 0; i < waves[this.level][wave].starbeetles; i++){
            var newEnemy = new Starbeetle (this, counter*-150)
            this.enemies.push(newEnemy)
            counter++
        }
        for (var i = 0; i < waves[this.level][wave].ladybugs; i++){
            var newEnemy = new Ladybug (this, counter*-150)
            this.enemies.push(newEnemy)
            counter++
        }
        for (var i = 0; i < waves[this.level][wave].stinkbugs; i++){
            var newEnemy = new Stinkbug (this, counter*-150)
            this.enemies.push(newEnemy)
            counter++
        }
    },

    clear: function () {
        this.ctx.clearRect(0, 0, this.w, this.h)
    },

    drawAll: function () {
        this.background.draw()
        this.scoreGold.draw()
        this.scoreLives.draw()
        this.purpleBtn.draw("purple")
        this.greenBtn.draw("green")
        this.computer.drawLeft()
        this.enemies.forEach (function (enemy) {
            enemy.draw()
        }.bind(this))
        this.computer.drawRight()
        this.computer.overchargeLeft()
        this.computer.overchargeRight()
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
            if (enemy.x > this.w - 170){
                this.lives -= 1
                    if (this.level === 2){
                        this.gold -= 100
                    }
                this.computer.overcharging = true
                this.computer.overcharge()
                setTimeout(function() { 
                    this.computer.overcharging = false
                    this.computer.left.src = "img/computer_left.png"
                    this.computer.right.src = "img/computer_right.png"
                }.bind(this), 2000)

                this.enemies.splice(this.enemies.indexOf(enemy),1)
            }
            if (this.lives === 0){
                this.stop()
                setTimeout(function() { 
                    lose.style.display = "block"
                    canvas.style.display = "none"
                }.bind(this), 200)
            }
        }.bind(this))
    }
}