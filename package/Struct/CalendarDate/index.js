const sxy = require('sxy')
const fxy = require('fxy')
const Cycles = new Set(['annual', 'bi_annual', 'is_done', 'not_applicable', 'not_specified', 'quarterly', 'once', 'ongoing', 'TBA', 'varies'])
const Formats = new Set([
	
	'D/M/YY',
	'D-M-YY',
	
	'M/D/YY',
	'M-D-YY',
	
	'D/M/YYYY',
	'D-M-YYYY',
	
	'M/D/YYYY',
	'M-D-YYYY',
	
	'MM/DD/YYYY',
	'MM-DD-YYYY',
	
	'DD-MM-YYYY',
	'DD/MM/YYYY',
	
	
	'YYYY/MM/DD',
	'YYYY-MM-DD',
	
	"MMM DD, YYYY hh:mm",
	
	"YYYY-MM-DDThh:mmZ",
	"YYYY-MM-DDThh:mm:ssZ",
	"YYYY-MM-DDThh:mm:ss.sZ"
])

class CalendarDate extends sxy.Point(__filename){
	static get valid(){ return get_valid }
	get cycle(){ return get_cycle(this) }
	get time(){
		if(!this.has('time')) this.set('time',this.date)
		return this.get('time')
	}
	get timestamp(){ return this.date }
}


//exports
module.exports = CalendarDate

//shared actions
function get_cycle(date){
	if(!date.has('cycle')) return null
	let cycle = date.get('cycle')
	if(fxy.is.TF(cycle.recurring)) return cycle
	cycle.recurring = is_recurring(cycle.type)
	return  get_cycle_type(cycle)
}

function get_cycle_type(cycle){
	let type = cycle.type
	if(!Cycles.has(type)) cycle.type = 'not_specified'
	return cycle
}

function get_valid(value){
	let moment = get_valid_moment(value)
	if(moment === null) return null
	return moment.toDate()
}

function get_valid_moment(value){
	const moment = require('moment-timezone')
	let date = moment(value)
	if(is_valid_moment()) return date
	for(const format of Formats){
		date = moment(value,format)
		if(is_valid_moment()) return date
	}
	return null
	//shared actions
	function is_valid_moment(){
		return date !== null && date.valid()
	}
}

function is_recurring(type){
	switch (type){
		case 'annual':
		case 'bi_annual':
		case 'quarterly':
		case 'ongoing':
			return true
		default:
			return false
	}
}

