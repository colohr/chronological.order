//shared actions
module.exports = {
	get AnnualCalendar(){ return require('../Interface').Annual },
	get CoordinatedTimezone(){ return require('./CoordinatedTimezone') },
	get CoordinatedUniversalTime(){ return require('../Interface').CoordinatedUniversalTime },
	get CoordinatedUniversalTimeFormat(){ return require('../Interface').InternationalFormat },
	get ChronologicalDate(){ return require('./ChronologicalDate') },
	get JavaScript(){ return require('../Interface').JavaScript },
	get UTC(){ return require('./UTC') }
}
