const fxy = require('fxy')
const utility = require('./utility')
const DateSet = require('./DateSet')
const text_interpretation = Symbol('text interpretation')
class Chronologic{
	constructor(input){
		if(fxy.is.array(input) && text_interpretation in input) input = get_interpreted_text_value_date(input)
		this.input = utility.value(input)
		if(!this.input.valid && fxy.is.text(input)) this.text_interpretation = utility.chronology.parse(input)
		console.dir(this,{colors:true,depth:5,showHidden:true})
	}
	get date(){ return this.date_value() }
	date_value(){ return get_date(this) }
	interpret({text}){ return interpret(this,text) }
	get interpreted(){ return interpret(this) }
	get list(){ return get_date_list(this) }
}

//exports
module.exports = input=>new Chronologic(input)
module.exports.Chronologic = Chronologic


//shared actions
function get_date(chronologic){
	let date = null
	if('text_interpretation' in chronologic) date = get_interpreted_date(chronologic)
	else date = chronologic.input.date
	return date
}

function get_dates_from_component(component){
	const set = new DateSet()
	if(fxy.is.data(component)){
		if(component.start) set.add('start',component.start.date())
		if(component.end) set.add('end',component.end.date())
	}
	return set
}

function get_date_list(chronologic){
	if('text_interpretation' in chronologic) return get_interpreted_dates(chronologic)
	return utility.valid.date(chronologic.input.date) ? [chronologic.input.date]:[]
}

function get_interpreted_date(chronologic){
	const dates = get_interpreted_dates(chronologic)
	return dates.length > 0 ? dates[0]:null
}

function get_interpreted_dates(chronologic){
	if(fxy.is.array(chronologic.text_interpretation)){
		const sets = get_interpreted_sets(chronologic)
		return get_sorted_dates_from_sets(...sets)
	}
	return []
}

function get_interpreted_sets(chronologic){
	return chronologic.text_interpretation
					  .map(get_dates_from_component)
}

function get_sorted_dates_from_sets(...sets){
	return sets.filter(set=>set.start !== null)
			   .sort((a,b)=>a.score(b.start))
			   .map(set=>set.date)
}

function interpret(chronologic,text){
	let interpreted = 'text_interpretation' in chronologic ? chronologic.text_interpretation:null
	let reference_date = get_date(chronologic)
	if(!interpreted && reference_date) interpreted = utility.chronology.parse(`${reference_date}`)
	if(fxy.is.text(text)){
		if(reference_date) interpreted = utility.chronology.parse(text,reference_date)
		else interpreted = utility.chronology.parse(text)
		interpreted[text_interpretation] = true
	}
	return interpreted
}

function get_interpreted_text_value_date(interpreted){
	try{ return interpreted[0].start.date() }
	catch(error){ return error }
}