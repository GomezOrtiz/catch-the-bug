function GreenMonster(game, x, y, minX, maxX, minY, maxY) {
    Tower.call(this, game, x, y, minX, maxX, minY, maxY)
    
    this.w = 140
    this.h = 135

    this.damage = 50
    this.range = 100

    this.upgradeValue = 1000

    this.level = 1

    this.img = new Image()
    this.img.src = ""

    this.imgSouth = "img/green_monster_lv1_S.png"
    this.imgNorth = "img/green_monster_lv1_N.png"
    this.bulletImg = "img/bullet_green_lv1.png"

    this.init(x)
}

GreenMonster.prototype = Object.create(Tower.prototype)
GreenMonster.prototype.constructor = GreenMonster

GreenMonster.prototype.upgrade = function () {

    if (this.game.gold >= this.upgradeValue && this.level < 3){
        if (this.level === 1){
            this.imgSouth = "img/green_monster_lv2_S.png"
            this.imgNorth = "img/green_monster_lv2_N.png"
            this.bulletImg = "img/bulletgreen2.png"


            this.damage = 100
            this.range = 150
        
            this.level++
    
        } else if (this.level === 2){
            this.imgSouth = "img/green_monster_lv3_S.png"
            this.imgNorth = "img/green_monster_lv3_N.png"
            this.bulletImg = "img/bulletgreen3.png"

            this.damage = 150
            this.range = 200
    
            this.level++
        } else if (this.level === 3) {
            this.upgradable = false
        }
        this.game.gold -= this.upgradeValue
        upgrade.play()
        this.upgradeValue = 1250
    }    
}