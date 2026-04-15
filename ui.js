function upgradeUI(up) {
	document.querySelector(`div#${up}.current-gain`).textContent = `${format(data.upgrades[up].getMulti())} (Level ${format(data.upgrades[up].level)})`
	document.querySelector(`button#${up}.upg-button`).textContent = `Buy for ${formatTimeEx(data.upgrades[up].getCost())}`
	document.querySelector(`button#${up}.upg-button`).onclick = (_ => {
		data.upgrades[up].buy()
	})
	document.querySelector(`button#${up}.upg-max-button`).onclick = (_ => {
		data.upgrades[up].buyMax()
	})
	document.querySelector(`button#${up}.upg-button`).disabled = data.seconds.lt(data.upgrades[up].getCost())
}
function updateUI() {
	document.getElementById("points-stat").textContent = formatTimeEx(data.seconds)
	document.getElementById("speed-stat").textContent = format(data.speed,2,true)
	upgradeUI("hastener")
	upgradeUI("generator")
	upgradeUI("powerer")
	upgradeUI("counter")
}
