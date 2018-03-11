const chronology = require('chrono-node')
const expressions = [
	new RegExp('\\d{4}(\\.|-)\\d{2}(\\.|-)\\d{2}'),
	//-- Complete precision:
	/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,

	//-- No milliseconds:
	/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)/,

	//-- No Seconds:
	/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)/,

	//-- Putting it all together:
	/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/
]

const is_valid_date = date=>isNaN(date.getTime()) !== true
const is_valid_object = date=>Object.prototype.toString.call(date) === "[object Date]"
const is_valid_text = text=>{
	for(const type of expressions) if(type.test(text)) return true
	return false
}

const Utility = {
	get chronology(){ return chronology },
	get unix(){ return require('./unix') },
	value:get_date_value,
	valid:{
		date:is_valid_date,
		text:is_valid_text
	}
}

//exports
module.exports = Utility

//shared actions
function get_date_value(value){
	let type = typeof value
	let date = null
	let valid = false
	switch(type){
		case 'number':
			date = new Date(value)
			valid = is_valid_date(date)
			type = 'timestamp'
			break
		case 'object':
			if(is_valid_object(value)){
				type = 'date'
				date = value
				valid = is_valid_date(date)
			}
			else if(Array.isArray(value)){
				type = 'array'
				date = new Date(...value)
				valid = is_valid_date(date)
			}
			break
		case 'string':
			valid = is_valid_text(value)
			if(valid) {
				type = 'text'
				date = new Date(value)
			}
			break
	}
	if(!valid) type = 'invalid'
	return {
		date,
		type,
		valid,
		value
	}
}








