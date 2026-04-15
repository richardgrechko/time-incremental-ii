class Upgrade {
	constructor(opt) {
		this.level = new Decimal(0);
		this.cost = opt.cost ?? new Decimal(1);
		this.multi = opt.multi ?? new Decimal(1);
		this.gain = opt.gain ?? new Decimal(1);
	}
	getMulti() {
		if (this.gain.lt(new Decimal(2).pow(128))) return this.gain
		return this.gain.root(this.multi.log(new Decimal(2).pow(128)).root(1.5))
	}
	buy() {
		if (data.seconds.gt(this.cost.mul(this.multi.pow(this.level)))) {
			this.level = this.level.add(1)
			data.seconds = data.seconds.sub(this.cost.mul(this.multi.pow(this.level)))
		}
	}
	buyMax() {
		if (data.seconds.gt(this.cost.mul(this.multi.pow(this.level)))) {
			this.level = this.level.add(
				Decimal.affordGeometricSeries(data.seconds,this.cost.mul(this.multi.pow(this.level)),this.multi)
			)
			data.seconds = data.seconds.sub(
				Decimal.affordGeometricSeries(
					Decimal.sumGeometricSeries(data.seconds,this.cost.mul(this.multi.pow(this.level)),this.multi)
					,this.cost.mul(this.multi.pow(this.level)),this.multi)
			)
		}
	}
}
