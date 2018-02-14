const fxy = require('fxy')
const Fields = {
	day:'2-digit',
	era:{era:'long',year:'numeric'},
	clock:{
		hour:'2-digit'
	},
	hour:{
		hour12:false,
		hour:'2-digit'
	},
	minute:{
		hour12:false,
		minute:'2-digit'
	},
	month:'long',
	second:{
		hour12:false,
		second:'2-digit'
	},
	time_zone_name:'long',
	weekday:'long',
	year:'numeric'
}

const Format = (locale,time_zone)=>({
	get(field){ return new Intl.DateTimeFormat(locale || 'en',this.setting(field)) },
	setting(field){
		const value = fxy.is.data(Fields[field]) ? Fields[field]:{[field]:Fields[field]}
		return get_setting(Object.assign({time_zone},value))
	}
})

//exports
module.exports = get_format
module.exports.date = get_date_format

//shared actions
function get_date_format(date,...x){
	const format = Format(...x)
	format.date = date
	return get_format_fields(format)
}

function get_format(...x){ return get_format_fields(Format(...x)) }

function get_format_fields(format){
	return new Proxy(Fields,{
		get(o,field){
			if(field in o) {
				if('date' in format) return format.get(field).format(format.date)
				return date=>format.get(field).format(date)
			}
			return null
		},
		has(o,field){ return field in o },
		ownKeys(){ return Object.keys(Fields) }
	})
}

function get_setting(x){
	const setting = {}
	for(const field in x) setting[fxy.id.medial(field)] = x[field]
	return setting
}