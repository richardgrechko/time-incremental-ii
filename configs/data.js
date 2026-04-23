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
Decimal.prototype.scale = function (s, p, mode, rev=false) {
    var x = this.clone()

    if (Decimal.lte(x,s)) return x

    switch (mode) {
        case 'L':
            // (x-s)*p+s
            return rev ? x.sub(s).div(p).add(s) : x.sub(s).mul(p).add(s)
        case 'P':
            // (x/s)^p*s
            return rev ? x.div(s).root(p).mul(s) : x.div(s).pow(p).mul(s)
        case 'E1':
            // p^(x-s)*s
            return rev ? x.div(s).max(1).log(p).add(s) : Decimal.pow(p,x.sub(s)).mul(s)
        case 'E2':
            // p^(x/s-1)*s, p >= 2.71828
            return rev ? x.div(s).max(1).log(p).add(1).mul(s) : Decimal.pow(p,x.div(s).sub(1)).mul(s)
        case 'ME1': {
            // p^(x-s)*x
            let ln_p = Decimal.ln(p)
            return rev ? Decimal.pow(p,s).mul(x).mul(ln_p).lambertw().div(ln_p) : Decimal.pow(p,x.sub(s)).mul(x)
        }
        case 'ME2': {
            // p^(x/s-1)*x
            let ln_p = Decimal.ln(p)
            return rev ? x.mul(p).mul(ln_p).div(s).lambertw().mul(s).div(ln_p) : Decimal.pow(p,x.div(s).sub(1)).mul(x)
        }
        case 'D': {
            // 10^((lg(x)/s)^p*s)
            let s10 = Decimal.log10(s)
            return rev ? Decimal.pow(10,x.log10().div(s10).root(p).mul(s10)) : Decimal.pow(10,x.log10().div(s10).pow(p).mul(s10))
        }
    }
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
	rank: {
		value: new Decimal(0),
		auto: false,
	},
	tier: {
		value: new Decimal(0),
		auto: false,
	},
	tetr: {
		value: new Decimal(0),
		auto: false,
	},
	pent: {
		value: new Decimal(0),
		auto: false,
	},
	beyondRanks: {
		value: new Decimal(0),
		get req() {
	        let p = player.beyondRanks.value
	
	        let x = p.scale(1e14,2,"D").pow(1.25).mul(10).add(180)
	
	        return x.ceil()
	    },
		get bulk() {
	        let x = player.pent.value.gte(180)?data.pent.value.sub(180).div(10).max(0).root(1.25).scale(1e14,2,"D",true).add(1).floor():E(0)
	
	        return x
	    },
		getTier(r=this.value) {
	        let x = r.gt(0)?r.log10().max(0).pow(.8).mul(1).add(1).scale(24,1.6,"P",true).floor():E(1)
	        return x
	    },
	    getRankFromTier(i,r=this) {
	        let hp = Decimal.pow(10,Decimal.pow(Decimal.sub(i.scale(24,1.6,"P"),1).div(1),1/.8)).ceil()
	
	        return r.div(hp).floor()
	    },
	    getRequirementFromTier(i,t=this.latestRank,mt=this.getTier()) {
	        let s = 24, p = 1.6
	        return Decimal.pow(10,Decimal.pow(Decimal.div(mt.add(1).scale(s,p,"P").sub(1),1),1/.8).sub(Decimal.pow(Decimal.sub(mt,i).add(1).scale(s,p,"P").sub(1).div(1),1/.8))).mul(Decimal.add(t,1)).ceil()
	    },
	    getRankDisplayFromValue(r) {
	        let tier = this.getTier(r), current = this.getRankFromTier(tier,r);
			let g = rankLevelConverter(tier.add(5))
	
	        return rankLevelConverter(tier.add(5)) + ' ' + format(current)
	    },
		get latestRank() {
			return this.getRankFromTier(this.getTier())
		},
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
