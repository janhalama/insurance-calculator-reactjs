var Reflux = require('reflux');

var InsuranceCalculatorActions = Reflux.createActions([
    'zipCodeUpdated',
	'emailUpdated',
	'birthdateUpdated',
	'carTypeUpdated',
	'setPage',
	'enginePowerUpdated',
	'engineSizeUpdated',
	'carWeightUpdated']);

module.exports = InsuranceCalculatorActions;