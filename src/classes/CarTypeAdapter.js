var CarTypeAdapter = ({
	getCarTypeNameByCode: function (carTypeCode)	{
		switch(carTypeCode)
		{
			case 'MOTORBIKE':
				return 'Motocykl';
			case 'BUSINESS_CAR':
				return 'Užitkový automobil';
			case 'LORRY_CAR':
				return 'Nákladní automobil';
			case 'PERSONAL_CAR':
				return 'Osobní automobil';
			default:
				throw 'Not supported car type code: ' + carTypeCode;
		}
	}
});

module.exports = CarTypeAdapter;