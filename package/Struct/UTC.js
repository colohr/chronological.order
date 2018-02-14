const {utility, Interface} = require('../bundle')
const utc_date_value = Symbol('UTCInterface Date value')
const UTC = Base => class extends Base{
	static get date_value(){ return utc_date_value }
	get date(){ return get_coordinated_universal_time(this) }
}

//exports
module.exports = UTC

//shared actions
function get_coordinated_universal_time(utc){
	const value = get_date_value(utc)
	if(value instanceof Date && utility.valid.date(value)){
		return Interface.CoordinatedUniversalTime(value)
	}
	return null
}

function get_date_value(utc){
	if(utc instanceof Map && utc.has('date')) return utc.get('date')
	if(utc_date_value in utc) return utc[utc_date_value]
	if(typeof utc.date_value === 'function') return utc.date_value()
	return null
}