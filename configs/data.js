const data = {
	seconds: new Decimal(0),
	speed: new Decimal(1e-30), // xNUM speed means you get +NUM seconds per second
	upgrades: {
		hastener: new Upgrade({
			cost: new Decimal(1e-29),
			multi: new Decimal(2.5),
			gain: new Decimal(2)
		}),
		generator: new Upgrade({
			cost: new Decimal(1e-26),
			multi: new Decimal(10),
			gain: new Decimal(2)
		}),
		powerer: new Upgrade({
			cost: new Decimal(1e-18),
			multi: new Decimal(25),
			gain: new Decimal(4)
		}),
		counter: new Upgrade({
			cost: new Decimal(10),
			multi: new Decimal(120),
			gain: new Decimal(10)
		}),
	},
	timeParadoxes: new Decimal(0),
}
