const data = {
	seconds: new Decimal(0),
	speed: new Decimal(1e-30), // xNUM speed means you get +NUM seconds per second
	upgrades: {
		hastener: new Upgrade({
			cost: new Decimal(1e-29),
			multi: new Decimal(2),
			gain: new Decimal(1.5)
		}),
		generator: new Upgrade({
			cost: new Decimal(1e-21),
			multi: new Decimal(10),
			gain: new Decimal(2)
		}),
		powerer: new Upgrade({
			cost: new Decimal(31556952),
			multi: new Decimal(25),
			gain: new Decimal(4)
		}),
	},
	timeParadoxes: new Decimal(0),
}
