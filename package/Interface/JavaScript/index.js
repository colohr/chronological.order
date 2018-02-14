const JavaScript = {
	get Date(){ return require('./Date') },
	get Time(){ return require('./Time') },
	get UTC(){ return require('./UTC') },
	get value(){ return this.UTC.value }
}

//exports
module.exports = JavaScript