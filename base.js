const App = {}
App.ls_state = "state_v1"
App.colorlib = ColorLib()
App.color = "#252933"

App.set_color = function (color) {
  if (color.startsWith("#")) {
    color = App.colorlib.hex_to_rgb(color)
  }
  
  let buttons = document.getElementById("buttons")
  buttons.style.color = App.colorlib.get_lighter_or_darker(color, 0.4)
  document.documentElement.style.setProperty("--bg_color", color)
  App.save_local_storage(App.ls_state, {color: color})
  App.color = color
}

App.toggle_fullscreen = function () {
  if(document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }  
}

App.get_exact_color = function () {
  let input = prompt("Enter color name, rgb, or hex")

  if (!input) {
    return
  }
  
  let reference = document.getElementById("reference")
  reference.style.color = input
  let color = window.getComputedStyle(reference).color
  App.set_color(color)  
}

App.init = function() {
  document.getElementById("fullscreen_button").addEventListener("click", function() {
    App.toggle_fullscreen()
  })

  document.getElementById("random_button").addEventListener("click", function() {
    App.set_color(App.colorlib.get_random_hex())
  })

  document.getElementById("darker_button").addEventListener("click", function() {
    App.set_color(App.colorlib.get_darker(App.color))
  })
  
  document.getElementById("lighter_button").addEventListener("click", function() {
    App.set_color(App.colorlib.get_lighter(App.color))
  })

  document.getElementById("exact_button").addEventListener("click", function() {
    App.get_exact_color()
  }) 

  App.state = App.get_local_storage(App.ls_state) || {}
  
  if (App.state.color) {
    App.color = App.state.color
  }

  App.set_color(App.color)
}

// Centralized function to get localStorage objects
App.get_local_storage = function (ls_name) {
  let obj

  if (localStorage[ls_name]) {
    try {
      obj = JSON.parse(localStorage.getItem(ls_name))
    } catch (err) {
      localStorage.removeItem(ls_name)
      obj = null
    }
  } else {
    obj = null
  }

  return obj
}

// Centralized function to save localStorage objects
App.save_local_storage = function (ls_name, obj) {
  localStorage.setItem(ls_name, JSON.stringify(obj))
}