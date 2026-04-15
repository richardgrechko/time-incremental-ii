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
	document.querySelector(`button#time-reset.reset-button`).disabled = data.seconds.lt(Decimal.mul(1e-21,new Decimal(100).pow(data.timeResets.points)))
	if (data.seconds.lt(Decimal.mul(1e-21,new Decimal(100).pow(data.timeResets.points)))) {
		document.querySelector(`button#time-reset.reset-button`).textContent = `Cannot reset`
	} else if (!data.timeResets.canMax) {
		document.querySelector(`button#time-reset.reset-button`).textContent = `Reset`
	} else {
		document.querySelector(`button#time-reset.reset-button`).textContent = `Reset ${Decimal.affordGeometricSeries(
				data.seconds,
				Decimal.mul(1e-21,new Decimal(100).pow(data.timeResets.points)),
				10
			)} times`
	}
	document.querySelector(`button#time-reset.reset-button`).onclick = (_ => {
		funcs.timeReset()
	})
	upgradeUI("hastener")
	upgradeUI("generator")
	upgradeUI("powerer")
	upgradeUI("counter")
}
