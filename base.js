const App = {}
App.ls_state = "state_v1"
App.colorlib = ColorLib()
App.default_color = "#252933"

App.init = function() {
  App.el("#fullscreen_button").addEventListener("click", function() {
    App.toggle_fullscreen()
  })

  App.el("#random_button").addEventListener("click", function() {
    App.set_color(App.colorlib.get_random_hex())
  })

  App.el("#darker_button").addEventListener("click", function() {
    App.set_color(App.colorlib.get_darker(App.get_reference()))
  })
  
  App.el("#lighter_button").addEventListener("click", function() {
    App.set_color(App.colorlib.get_lighter(App.get_reference()))
  })

  App.el("#exact_button").addEventListener("click", function() {
    App.get_exact_color()
  }) 

  App.el("#red_button").addEventListener("click", function() {
    App.set_color("red")
  })   

  App.el("#green_button").addEventListener("click", function() {
    App.set_color("green")
  }) 

  App.el("#blue_button").addEventListener("click", function() {
    App.set_color("blue")
  }) 

  App.el("#black_button").addEventListener("click", function() {
    App.set_color("black")
  }) 

  App.el("#white_button").addEventListener("click", function() {
    App.set_color("white")
  }) 

  App.state = App.get_local_storage(App.ls_state) || {}
  App.set_color(App.state.color || App.default_color)
}

App.set_color = function (color) {
  App.set_reference(color)
  let color_1 = App.get_reference()
  let color_2 = App.colorlib.get_lighter_or_darker(color_1, 0.5)
  document.documentElement.style.setProperty("--color_1", color_1)
  document.documentElement.style.setProperty("--color_2", color_2)
  App.save_local_storage(App.ls_state, {color: color_1})
  App.el("#color_info").textContent = color_1
}

App.toggle_fullscreen = function () {
  if(document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }  
}

App.set_reference = function (color) {
  App.el("#reference").style.color = color
}

App.get_reference = function () {
  return window.getComputedStyle(App.el("#reference")).color
}

App.get_exact_color = function () {
  let input = prompt("Enter color name, rgb, or hex")

  if (!input) {
    return
  }

  App.set_color(input)
}

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

App.save_local_storage = function (ls_name, obj) {
  localStorage.setItem(ls_name, JSON.stringify(obj))
}

App.el = function (query, root = document) {
  return root.querySelector(query)
}

App.els = function (query, root = document) {
  return Array.from(root.querySelectorAll(query))
}