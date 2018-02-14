const UTC = require('./UTC')
class JavaScriptDate extends UTC{
	get day(){ return get_day(this) }
	get day_of_the_week(){ return get_day_of_the_week(this) }
	get month(){ return get_month(this) }
	get year(){ return get_year(this) }
}

//exports
module.exports = value=>new JavaScriptDate(value)

//shared actions
function get_day({value}){
	return value.getDate()
}

function get_day_of_the_week({value}){
	return value.getDay()
}

function get_month({value}){
	return value.getMonth()
}

function get_year({value}){
	return value.getFullYear()
}
