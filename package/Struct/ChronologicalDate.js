const UTC = require('./UTC')
const Chronologic = require('../chronology').Chronologic
class ChronologicalDate extends UTC(Chronologic){
	interpret(input){
		return new ChronologicalDate(super.interpret(input))
	}
}

//exports
module.exports = ChronologicalDate