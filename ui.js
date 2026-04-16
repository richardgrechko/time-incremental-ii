function upgradeUI(up) {
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
	if (data.seconds.lt(Decimal.mul(1e-27,new Decimal(10).pow(data.timeResets.points)))) {
		document.querySelector(`button#time-reset.reset-button`).textContent = `Cannot reset`
	} else if (!data.timeResets.canMax) {
		document.querySelector(`button#time-reset.reset-button`).textContent = `Reset`
	} else {
		document.querySelector(`button#time-reset.reset-button`).textContent = `Reset ${data.timeResets.points.log(10).sub(data.timeResets.points).mul(1e-27).floor()} times`
	}
	document.querySelector(`button#time-reset.reset-button`).onclick = (_ => {
		if(data.seconds.gte(Decimal.mul(1e-27,new Decimal(10).pow(data.timeResets.points))))funcs.timeReset()
	})
	document.querySelector(`div#time-reset`).style.display = data.timeResets.unlocked ? "inline" : "none"
	document.querySelector(`div#time-reset.reset-container`).style.display = data.timeResets.unlocked ? "flex" : "none"
	document.querySelector(`button#time-reset.reset-button`).disabled = !data.timeResets.unlocked
	document.querySelector(`div#hastener.current-gain`).textContent = `Currently: +${format(new Decimal(1).add(generator.hastener.level.mul(generator.hastener.gain)))} (Level ${format(generator.hastener.level)})`
	upgradeUI("hastener")
	document.querySelector(`div#generator.current-gain`).textContent = `Currently: ×${format(new Decimal(1).add(generator.generator.level.mul(generator.generator.gain)))} (Level ${format(generator.generator.level)})`
	upgradeUI("generator")
	document.querySelector(`div#powerer.current-gain`).textContent = `Currently: ^${format(new Decimal(1).add(data.upgrades.powerer.level.mul(data.upgrades.powerer.gain)))} (Level ${format(data.upgrades.powerer.level)})`
	upgradeUI("powerer")
	document.querySelector(`div#counter.current-gain`).textContent = `Currently: ×${format(data.upgrades.counter.getMulti())} (Level ${format(data.upgrades.counter.level)})`
	upgradeUI("counter")
}
