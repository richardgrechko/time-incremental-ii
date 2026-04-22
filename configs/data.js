function sumBase(x,a) {
    return Decimal.pow(a,x).sub(1).div(Decimal.sub(a,1))
}
function revSumBase(x,a) {
    return Decimal.mul(x,Decimal.sub(a,1)).add(1).log(a).floor()
}

Decimal.prototype.sumBase = function(a,rev=false) { return rev ? revSumBase(this,a) : sumBase(this,a) }

function powPO(x,b,rev=false) {
    if (Decimal.lt(b,1.4285714287176406e-8)) {
        return rev ? Decimal.ln(x).div(b) : Decimal.mul(x,b).exp();
    } else {
        return rev ? Decimal.log(x,Decimal.add(b,1)) : Decimal.add(b,1).pow(x);
    }
}

Decimal.prototype.powPO = function(x,rev) { return powPO(this,x,rev) }

function sumBasePO(x,a,rev=false) {
    if (Decimal.lte(a,0)) return x
    return rev ? Decimal.mul(x,a).add(1).powPO(a,true) : powPO(x,a).sub(1).div(a)
}

Decimal.prototype.sumBasePO = function(x,rev) { return sumBasePO(this,x,rev) }
function getTierFromRankLevel(n,cost) {
	n = new Decimal(n).floor()
	let k = n.log(new Decimal(cost).log10()).pow(1/1.25).root(n.add(1).log10().root(10))
	if (k.lt(1)) return [n,0]
	return [n.div(Decimal.pow(cost,k.floor().pow(1.25).pow(n.add(1).log10().root(10)))).floor(),k.floor()]
}
const plr = {
	currentTab: "Main",
}
const data = {
	seconds: new Decimal(0),
	speed: new Decimal(1e-30), // xNUM speed means you get +NUM seconds per second
	energy: new Decimal(0),
	energyGain: new Decimal(0),
	energyDim: {
		value: new Decimal(0),
		amount: new Decimal(0),
	},
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
		B1: {
			level: new Decimal(0),
			cost: new Decimal(20),
			get totalCost() {
				return Decimal.pow(7,this.level.sumBasePO(0.1)).mul(this.cost)
			},
			get bulk() {
				return this.level.div(this.cost).log(7).sumBasePO(0.1,true).floor().add(1)
			},
			buy() {
				this.level = this.level.add(1);
				
			},
			curr: "energy"
		},
		B2: {
			level: new Decimal(0),
			cost: new Decimal(1e50),
			get totalCost() {
				return Decimal.pow(30,this.level.sumBasePO(0.1)).mul(this.cost)
			},
			get bulk() {
				return this.level.div(this.cost).log(30).sumBasePO(0.1,true).floor().add(1)
			},
			buy() {
			},
			curr: "seconds"
		},
	},
	timeResets: {
		points: new Decimal(0),
		unlocked: false,
		auto: false,
		canMax: false,
	},
	timeParadoxes: new Decimal(0),
}
