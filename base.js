const CS = {}
CS.colorlib = ColorLib()
CS.color = "#252933"

CS.set_color = function (color) {
  let buttons = document.getElementById("buttons")
  buttons.style.color = CS.colorlib.get_lighter_or_darker(color, 0.4)
  document.documentElement.style.setProperty("--bg_color", color)
  CS.color = color
}

CS.init = function() {
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

  document.getElementById("darker_button").addEventListener("click", function() {
    CS.set_color(CS.colorlib.get_darker(CS.color))
  })
  
  document.getElementById("lighter_button").addEventListener("click", function() {
    CS.set_color(CS.colorlib.get_lighter(CS.color))
  })

  document.getElementById("exact_button").addEventListener("click", function() {
    let input = prompt("Enter color name, rgb, or hex")
    let reference = document.getElementById("reference")
    reference.style.color = input
    let color = window.getComputedStyle(reference).color
    CS.set_color(color)
  }) 

  CS.set_color(CS.color)
}