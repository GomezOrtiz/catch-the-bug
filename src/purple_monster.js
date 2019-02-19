function PurpleMonster(game, x, y, minX, maxX, minY, maxY) {
    Tower.call(this, game, x, y, minX, maxX, minY, maxY)
    
    this.w = 140
    this.h = 117

    this.damage = 50
    this.range = 100

    this.upgradeValue = 500
    this.goldValue = 500

    this.level = 1

    this.img = new Image()
    this.img.src = ""

    this.imgSouth = "img/purple_monster_lv1_S.png"
    this.imgNorth = "img/purple_monster_lv1_N.png"

    this.init(x)
}

PurpleMonster.prototype = Object.create(Tower.prototype)
PurpleMonster.prototype.constructor = PurpleMonster

PurpleMonster.prototype.upgrade = function () {

    if (this.game.gold >= this.upgradeValue){
        if (this.level === 1){
            this.imgSouth = "img/purple_monster_lv2_S.png"
            this.imgNorth = "img/purple_monster_lv2_N.png"
    
            this.damage = 100
            this.range = 150
        
            this.level++
    
        } else if (this.level === 2){
            this.imgSouth = "img/purple_monster_lv3_S.png"
            this.imgNorth = "img/purple_monster_lv3_N.png"
    
            this.damage = 200
            this.range = 200
    
            this.level++
        }
        this.game.gold -= this.upgradeValue
        this.upgradeValue = 1000
    }    
}