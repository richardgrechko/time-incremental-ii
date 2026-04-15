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
	getCost() {
		return this.cost.mul(this.multi.pow(this.level))
	}
	buy() {
		if (data.seconds.gt(this.getCost())) {
			this.level = this.level.add(1)
			data.seconds = data.seconds.sub(this.getCost())
		}
	}
	buyMax() {
		if (data.seconds.gt(this.getCost())) {
			this.level = this.level.add(
				Decimal.affordGeometricSeries(data.seconds,this.getCost(),this.multi)
			)
			data.seconds = data.seconds.sub(
				Decimal.sumGeometricSeries(
					Decimal.affordGeometricSeries(data.seconds,this.getCost(),this.multi)
					,this.getCost(),this.multi)
			)
		}
	}
}
