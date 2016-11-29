var InsuranceCalculationService = ({
	zipCodeDiscount: function(zipCode)
	{
		if(zipCode[0] != '1')
			return 0.9;
		return 1;
	},
	ageDiscount: function(age)
	{
		if(age < 26)
			return 1.2;
		if (age > 35)
			return 0.9;
		return 1;
	},
	carWeightDiscount: function(carWeight)
	{
		if(carWeight > 3500)
			return 1.2;
		return 1;
	},
	engineDiscount: function(enginePower, engineSize)
	{
		if(engineSize > 1600 || enginePower > 100)
			return 1.3;
		return 1;
	},
	CalculateInsurance: function (calculatorState) {
		switch(calculatorState.carType)
		{
			case 'MOTORBIKE':
			case 'PERSONAL_CAR':
				return 1000 * this.zipCodeDiscount(calculatorState.zipCodeState.zipCodeInfo.zipCode) 
							* this.ageDiscount(calculatorState.birthdateState.years)
							* this.engineDiscount(calculatorState.enginePower.value, calculatorState.engineSize.value);
			case 'BUSINESS_CAR':
			case 'LORRY_CAR':
				return 1000 * this.zipCodeDiscount(calculatorState.zipCodeState.zipCodeInfo.zipCode) 
							* this.ageDiscount(calculatorState.birthdateState.years)
							* this.carWeightDiscount(calculatorState.carWeight.value);
			default:
				throw 'Not supported car type code: ' + carTypeCode;
		}
	}
});

module.exports = InsuranceCalculationService;