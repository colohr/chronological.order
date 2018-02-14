//exports
module.exports = {
	documentation:'https://developers.google.com/maps/documentation/timezone/start',
	endpoint:'https://maps.googleapis.com/maps/api/timezone/json',
	name:'Maps/TimeZone',
	get parameters(){
		return require('fxy').app().api(this.provider,this.name).parameters
	},
	provider:'Google',
	get saves(){
		return require('fxy').app().api(this.provider,this.name).saves !== false
	}
}