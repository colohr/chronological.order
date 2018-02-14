const UTC = require('./UTC')
class JavaScriptTime extends UTC{
	get hour(){ return get_hour(this) }
	get millisecond(){ return get_millisecond(this) }
	get minute(){ return get_minute(this) }
	get timezone_offset(){ return get_timezone_offset(this) }
	get second(){ return get_second(this) }
	get stamp(){ return get_stamp(this) }
}


//exports
module.exports = value=>new JavaScriptTime(value)

//shared actions
function get_hour({value}){
	return value.getUTCHours()
}

function get_millisecond({value}){
	return value.getUTCMilliseconds()
}

function get_minute({value}){
	return value.getUTCMinutes()
}

function get_second({value}){
	return value.getUTCSeconds()
}

function get_stamp({value}){
	return value.getTime()
}

function get_timezone_offset({value}){
	return value.getTimezoneOffset()
}



