let delta = 0
let dt1 = Date.now();
let dt2 = Date.now();
const funcs = {
	save() {
		localStorage.setItem("timeincrementaliisave",btoa(unescape(encodeURIComponent(JSON.stringify(data)))))
	},
	getSave() {
		return JSON.parse(decodeURIComponent(escape(atob(localStorage.getItem("timeincrementaliisave")))))
	},
	load() {
		let obj = funcs.getSave()
		try {
			data.seconds = fixValue(new Decimal(obj.seconds));
			data.speed = fixValue(new Decimal(obj.speed),1e-30);
			data.upgrades = {};
			data.upgrades.hastener = new Upgrade(obj.upgrades.hastener ?? {
				cost: new Decimal(1e-29),
				multi: new Decimal(2),
				gain: new Decimal(1.5)
			});
			data.upgrades.hastener.level = new Decimal(obj.upgrades.hastener.level)
			data.upgrades.generator = new Upgrade(obj.upgrades.generator ?? {
				cost: new Decimal(1e-12),
				multi: new Decimal(10),
				gain: new Decimal(2)
			});
			data.upgrades.generator.level = new Decimal(obj.upgrades.generator.level)
			data.upgrades.powerer = new Upgrade(obj.upgrades.powerer ?? {
				cost: new Decimal(31556952),
				multi: new Decimal(25),
				gain: new Decimal(4)
			});
			data.upgrades.powerer.level = new Decimal(obj.upgrades.powerer.level)
		} catch (e) {
			alert(e)
		}
	},
	update() {
		dt1 = Date.now()
		delta = (dt1-dt2)/1000
		dt2 = Date.now()
		data.seconds = data.seconds.add(data.speed.mul(delta))
		data.speed = data.upgrades.hastener.getMulti()
		.mul(data.upgrades.generator.getMulti())
		.mul(data.upgrades.powerer.getMulti())
		.div(1e30)
		requestAnimationFrame(funcs.update)
	},
}
