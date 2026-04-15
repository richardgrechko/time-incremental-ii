function updateUI() {
	document.getElementById("points-stat").textContent = formatTimeEx(data.seconds)
	document.getElementById("speed-stat").textContent = format(data.speed)
	document.querySelector("div#hastener.current-gain").textContent = `${format(data.upgrades.hastener.getMulti())} (${format(data.upgrades.hastener.level)})`
	document.querySelector("div#hastener.upg-button").textContent = format(data.upgrades.hastener.getCost())
	document.querySelector("div#generator.current-gain").textContent = `${format(data.upgrades.generator.getMulti())} (${format(data.upgrades.generator.level)})`
	document.querySelector("div#generator.upg-button").textContent = format(data.upgrades.generator.getCost())
	document.querySelector("div#powerer.current-gain").textContent = `${format(data.upgrades.powerer.getMulti())} (${format(data.upgrades.powerer.level)})`
	document.querySelector("div#powerer.upg-button").textContent = format(data.upgrades.powerer.getCost())
	requestAnimationFrame(updateUI)
}
