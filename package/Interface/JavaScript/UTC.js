const javascript_value = Symbol('JavaScript Date')
const coordinated_universal_time = Symbol('Coordinated Universal Time')
class UTC {
	static get value(){ return javascript_value }
	constructor(origin){
		this[coordinated_universal_time] = origin
	}
	get value(){ return this[coordinated_universal_time][javascript_value] }
}

//exports
module.exports = UTC