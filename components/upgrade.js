class Upgrade {
	constructor(opt) {
		this.level = new Decimal(0);
		this.cost = new Decimal(opt.cost) ?? new Decimal(1);
		this.multi = new Decimal(opt.multi) ?? new Decimal(1);
		this.gain = new Decimal(opt.gain) ?? new Decimal(1);
	}
	getMulti() {
		if (this.gain.lt(new Decimal(2).pow(128))) return this.gain.pow(this.level)
		return this.gain.pow(this.level).root(this.gain.pow(this.level).log(new Decimal(2).pow(128)).root(1.5))
	}
	getCost() {
		return this.cost.mul(this.multi.pow(this.level))
	}
	buy() {
		if (data.seconds.gt(this.getCost())) {
			data.seconds = data.seconds.sub(this.getCost())
			this.level = this.level.add(1)
		}
	}
	buyMax() {
		if (data.seconds.gt(this.getCost())) {
			let prev_seconds = data.seconds
			data.seconds = 
				Decimal.affordGeometricSeries(data.seconds,this.getCost(),this.multi).eq(1)?
				data.seconds.sub(this.getCost()):
				data.seconds.sub(
				Decimal.sumGeometricSeries(
					Decimal.affordGeometricSeries(data.seconds,this.getCost(),this.multi)
					,this.getCost(),this.multi)
			)
			this.level = this.level.add(
				Decimal.affordGeometricSeries(prev_seconds,this.getCost(),this.multi)
			)
		}
	}
}
