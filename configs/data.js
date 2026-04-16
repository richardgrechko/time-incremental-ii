const data = {
	seconds: new Decimal(0),
	speed: new Decimal(1e-30), // xNUM speed means you get +NUM seconds per second
	upgrades: {
		hastener: new Upgrade({
			cost: new Decimal(1e-29),
			multi: new Decimal(1.5),
			gain: new Decimal(0.25)
		}),
		generator: new Upgrade({
			cost: new Decimal(1e-28),
			multi: new Decimal(5),
			gain: new Decimal(0.5)
		}),
		powerer: new Upgrade({
			cost: new Decimal(1e-27),
			multi: new Decimal(100),
			gain: new Decimal(1)
		}),
		counter: new Upgrade({
			cost: new Decimal(10),
			multi: new Decimal(600),
			gain: new Decimal(4)
		}),
	},
	timeResets: {
		points: new Decimal(0),
		unlocked: false,
		auto: false,
		canMax: false,
	},
	timeParadoxes: new Decimal(0),
}
