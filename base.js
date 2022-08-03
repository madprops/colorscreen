const CS = {}
CS.colorlib = ColorLib()

CS.set_color = function (color) {
  let buttons = document.getElementById("buttons")
  buttons.style.color = CS.colorlib.get_lighter_or_darker(color, 0.4)
  document.documentElement.style.setProperty("--bg_color", color)
}

CS.init = function() {
  let main = document.getElementById("main")
  
  document.getElementById("fullscreen_button").addEventListener("click", function() {
    if(document.fullscreenElement) {
      document.exitFullscreen()
    }

    else {
      document.documentElement.requestFullscreen()
    }
  })

  document.getElementById("random_button").addEventListener("click", function() {
    CS.set_color(CS.colorlib.get_random_hex())
  })

  CS.set_color(window.getComputedStyle(main).backgroundColor)
}