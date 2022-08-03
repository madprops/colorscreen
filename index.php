<!DOCTYPE html>

<html>
	<head>
		<link rel="icon" type="image/png" href="favicon.png"/>

		<?php 
			function IsNullOrEmptyString($str) {
				return (!isset($str) || trim($str) === "");
			}

			$url = $_SERVER["REQUEST_URI"]; 
			$color = "black";
		?>

		<title><?php echo $color ?></title>

		<style>
			:root {
				--bg_color: <?php echo $color ?>;
			}		

			body, html {
				width: 100vw;
				height: 100vh;
				margin: 0;
				padding: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				font-family: sans-serif;
			}

			#main {
				background-color: var(--bg_color);
				width: 100%;
				height: 100%;
				overflow: hidden;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			#buttons {
				display: flex;
				flex-direction: column;
				gap: 1rem;
				opacity: 0;
				transition: opacity 250ms;
			}

			#buttons:hover {
				opacity: 1;
			}

			#buttons div {
				font-size: 40px;
				border: 4px solid currentColor;
				padding: 10px;
				cursor: pointer;
			}

			.unselectable {
				-webkit-touch-callout: none;
				-webkit-user-select: none;
				-khtml-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
			}

		</style>

		<script src="colorlib.js"></script>

		<script>
			const colorlib = ColorLib()

			function set_color (color) {
				let buttons = document.getElementById("buttons")
				buttons.style.color = colorlib.get_lighter_or_darker(color, 0.4)
  			document.documentElement.style.setProperty("--bg_color", color)
			}

			window.onload = function() {
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
					set_color(colorlib.get_random_hex())
				})

				set_color(window.getComputedStyle(main).backgroundColor)
			}
		</script>
	</head>

	<body>
		<div id="main">
			<div id="buttons" class="unselectable">
				<div id="random_button">Random Color</div>
				<div id="fullscreen_button">Toggle Fullscreen</div>
			</div>
		</div>
	</body>
</html>