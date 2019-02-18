function Score (game) {
    this.game = game
  
    this.w = 176
    this.h = 60

    this.y = 0
  
  }

Score.prototype.draw = function() {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    this.game.ctx.font = "24px georgia"
    this.drawText()
}

function ScoreGold (game) {
  Score.call(this,game)

  this.img = new Image()
  this.img.src = 'img/gold.png'

  this.x = (this.game.w - this.w)
  
}

ScoreGold.prototype = Object.create(Score.prototype)
ScoreGold.prototype.constructor = ScoreGold

ScoreGold.prototype.drawText = function () {
  this.game.ctx.fillStyle = "white"
  this.game.ctx.fillText(this.game.gold, this.x + 60,this.y + 37)
}

function ScoreLives (game) {
  Score.call(this,game)

  this.img = new Image()
  this.img.src = 'img/lives.png'

  this.x = (this.game.w - this.w * 2)

  this.text = this.game.lives
  
}

ScoreLives.prototype = Object.create(Score.prototype)
ScoreLives.prototype.constructor = ScoreLives

ScoreLives.prototype.drawText = function () {
  this.game.ctx.fillStyle = "white"
  this.game.ctx.fillText(this.game.lives, this.x + 60,this.y + 35)
}


