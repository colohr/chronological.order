const JavaScript = require('./JavaScript')
const Annual = require('./Annual')
const InternationalFormat = require('./InternationalFormat')

class CoordinatedUniversalTime{
	constructor(value){ this[JavaScript.value] = value }
	get annual(){ return Annual(this.date) }
	copy(){ return new Date(this.utc) }
	get date(){ return JavaScript.Date(this) }
	format({locale, timezone}){ return InternationalFormat.date(this.copy(), locale, timezone) }
	get inputs(){ return get_inputs(this) }
	get iso(){ return this[JavaScript.value].toISOString() }
	get time(){ return JavaScript.Time(this) }
	get text(){ return this[JavaScript.value].toUTCString() }
	get to(){ return InternationalFormat.date(this.copy()) }
	get utc(){ return Date.UTC(...this.inputs) }
}

//exports
module.exports = date=>new CoordinatedUniversalTime(date)

//shared actions
function get_inputs({date,time}){
	return [date.year, date.month, date.day, time.hour, time.minute, time.second, time.millisecond]
}