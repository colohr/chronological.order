const {is} = require('fxy')

const Calendar = {
	Quarters:{
		1:[0,1,2],
		2:[3,4,5],
		3:[6,7,8],
		4:[9,10,11]
	}
}

const Quarter = value=>({
	get id(){ return `Q${this.value}`},
	months(input){ return get_quarter_months(this,input) },
	value
})

const Annual = date=>({
	get quarter(){ return get_quarter(date) }
})

//exports
module.exports = Annual
module.exports.Quarter = Quarter
module.exports.Calendar = Calendar

//shared actions
function get_quarter({month}){
	let value = 4
	if(month >= 0 && month < 3){
		value = 1
	}
	else if(month >= 3 && month < 6){
		value = 2
	}
	else if(month >= 6 && month < 9){
		value = 3
	}
	return Quarter(value)
}

function get_quarter_months(quarter,input){
	if(!is.data(input)) input = {}
	const indexes = Calendar.Quarters[quarter.value]
	return indexes.map(index=>get_month_name(index,input.locale))
}

function get_month_name(index,locale='en'){
	const today = new Date()
	today.setMonth(index)
	return today.toLocaleString(locale,{month:'long'})
}