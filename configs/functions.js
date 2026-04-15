const funcs = {
	save() {
		localStorage.setItem("timeincrementaliisave",btoa(unescape(encodeURIComponent(JSON.stringify(data)))))
	},
	getSave() {
		return JSON.parse(decodeURIComponent(escape(atob(localStorage.getItem("timeincrementaliisave"))))))
	},
	load() {
		let obj = funcs.getSave()
		try {
			data.seconds = fixValue(obj.seconds);
			data.speed = fixValue(obj.speed,1e-30);
			data.upgrades = {};
			data.upgrades?.hastener = obj.upgrades?.hastener ?? new Upgrade({
				cost: new Decimal(1e-29),
				multi: new Decimal(2.1),
				gain: new Decimal(2)
			});
			data.upgrades?.generator = obj.upgrades?.generator ?? new Upgrade({
				cost: new Decimal(1e-12),
				multi: new Decimal(10),
				gain: new Decimal(2)
			});
			data.upgrades?.powerer = obj.upgrades?.powerer ?? new Upgrade({
				cost: new Decimal(31556952),
				multi: new Decimal(25),
				gain: new Decimal(4)
			});
		} catch (e) {
			alert(e)
		}
	},
	update(delta) {
		data.seconds = data.seconds.add(obj.speed)
		data.speed = new Decimal(1e-30).mul(data.upgrades.hastener.getMulti())
		.mul(data.upgrades.generator.getMulti())
		.mul(data.upgrades.powerer.getMulti())
	},
}
