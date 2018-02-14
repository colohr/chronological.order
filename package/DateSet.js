const utility = require('./utility')
const date_range_name = Symbol('Range name for the date. Either start or end')

class DateSet extends Array{
	add(name, date){
		if(utility.valid.date(date)) {
			date[date_range_name] = name
			this.push(date)
		}
		return this
	}
	get count(){ return this.length }
	get start(){ return this.length > 0 && this[0][date_range_name] === 'start' ? this[0]:null }
	score(date){
		const start = this.start
		if(start === null) return 1
		else if(start === date) return 0
		return this.start < date ? -1:1
	}
}

//exports
module.exports = DateSet