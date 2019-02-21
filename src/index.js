window.onload = function() {
  var intro = document.querySelector("#intro")
  var tutorial1 = document.querySelector("#tutorial_1")
  var tutorial2 = document.querySelector("#tutorial_2")
  var tutorial3 = document.querySelector("#tutorial_3")
  var example = document.querySelector("#example")
  var win = document.querySelector("#win")
  intro.style.display = "block"
  example.style.width = "1140px"
  example.style.height = "500px"

  document.onkeydown = function(e) {
    if (e.keyCode === 13) {
      if (intro.style.display === "block"){
        example.style.display = "block"
        tutorial1.style.display = "block"
        canvas.style.display = "block"
        intro.style.display = "none"
      } else if (tutorial1.style.display === "block"){
        tutorial2.style.display = "block"
        tutorial1.style.display = "none"
      } else if (tutorial2.style.display === "block"){
        tutorial3.style.display = "block"
        tutorial2.style.display = "none"
      } else if (tutorial3.style.display === "block"){
        tutorial3.style.display = "none"
        example.style.display = "none"
        // tutorial3.style.display = "block"
        document.querySelector("body").style.cursor = "pointer"
        Game.init("canvas") 
      } else if (win.style.display === "block" || lose.style.display === "block") {
            win.style.display = "none"
            lose.style.display = "none"
            canvas.style.display = "block"
            Game.stop()
            Game.start()
      }
      // } else if (tutorial3.style.display === "block"){
      //   tutorial1.style.display = "none"
      // }

    }
  }
}