function upgradeUI(up) {
	document.querySelector(`div#${up}.current-gain`).textContent = `${format(data.upgrades[up].getMulti())} (${format(data.upgrades[up].level)})`
	document.querySelector(`div#${up}.upg-button`).textContent = formatTimeEx(data.upgrades[up].getCost())
}
function updateUI() {
	document.getElementById("points-stat").textContent = formatTimeEx(data.seconds)
	document.getElementById("speed-stat").textContent = format(data.speed)
	upgradeUI("hastener")
	upgradeUI("generator")
	upgradeUI("powerer")
}
