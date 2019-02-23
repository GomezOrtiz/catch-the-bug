window.onload = function() {
  var intro = document.querySelector("#intro")
  var tutorial1 = document.querySelector("#tutorial_1")
  var tutorial2 = document.querySelector("#tutorial_2")
  var tutorial3 = document.querySelector("#tutorial_3")
  var level = document.querySelector("#level")
  var example = document.querySelector("#example")
  var win = document.querySelector("#win")
  var lose = document.querySelector("#lose")
  intro.style.display = "block"
  example.style.width = "1140px"
  example.style.height = "500px"

  document.onkeydown = function(e) {
    if (e.keyCode === 13) {
      if (intro.style.display === "block"){
        mainTune.play()
        example.style.display = "block"
        tutorial1.style.display = "block"
        intro.style.display = "none"
        confirm.play()
      } else if (tutorial1.style.display === "block"){
        tutorial2.style.display = "block"
        tutorial1.style.display = "none"
        confirm.play()
      } else if (tutorial2.style.display === "block"){
        tutorial3.style.display = "block"
        tutorial2.style.display = "none"
        confirm.play()
      } else if (tutorial3.style.display === "block"){
        level.style.display = "block"
        tutorial3.style.display = "none"
        confirm.play()
      } else if (win.style.display === "block" || lose.style.display === "block") {
            win.style.display = "none"
            lose.style.display = "none"
            Game.stop()
            level.style.display = "block"
            example.style.display = "block"
      }
    /* EN EL MODO FÁCIL, DESCOMENTAR ESTOS ATAJOS PARA MOSTRAR RÁPIDAMENTE TODAS LAS FUNCIONALIDADES: 
    } else if (e.keyCode === 71){
        console.log("KLAPAUCIUS!!!!!")
        Game.gold += 5000
    } else if (e.keyCode === 76){
        console.log("KAMIKAZE!!!!!")
        Game.lives = 1
    } else if (e.keyCode === 90){
        console.log("FEAR THE WALKING DEAD!!!!!")
        Game.wave = 9
    } else if (e.keyCode === 69){
        console.log("INSTAWIN!!!!!")
        Game.wave = waves[Game.level].length
    FIN DE LOS ATAJOS */
    }
  }
  document.onclick = function (e) {

    if (level.style.display === "block") {
      if (e.clientX > 520 && e.clientX < 755){
        if(e.clientY > 190 && e.clientY < 243){
            Game.level = 0
            confirmLevel.play()
        } else if (e.clientY > 275 && e.clientY < 325){
            Game.level = 1
            confirmLevel.play()
        } else if (e.clientY > 360 && e.clientY < 410){
          Game.level = 2
          confirmLevel.play()
        }
      }
    level.style.display = "none"
    example.style.display = "none"
    document.querySelector("body").style.cursor = "pointer"
    canvas.style.display = "block"
    Game.init("canvas") 
    }
  }
}