const sxy = require('sxy')
const {timezone} = require('../bundle')
const coordinated_timezone = Symbol('CoordinatedTimezone')
class CoordinatedTimezone extends sxy.ModulePoint({process,__filename},'CoordinatedTimezone'){
	get daylight_savings_time_offset(){ return this.get('dst_offset') }
	get id(){ return this.get('time_zone_id') }
	get name(){ return this.get('time_zone_name') }
	get offset(){ return this.get('raw_offset') }
}

//exports
module.exports = get_timezone

//shared actions
async function get_timezone(container){
	if(coordinated_timezone in container) return container[coordinated_timezone]
	const data = await timezone(container)
	return container[coordinated_timezone] = new CoordinatedTimezone(data.value)
}