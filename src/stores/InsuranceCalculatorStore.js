var Reflux = require('reflux');
var InsuranceCalculatorActions = require('../actions/InsuranceCalculatorActions');
var WebApi = require('../WebApiClients/InsuranceCalculatorWebApi');
var Moment = require('moment');

var InsuranceCalculatorStore = Reflux.createStore({
	listenables: [InsuranceCalculatorActions],
	getDefaultCalculatorState: function() {
		return ({
			page: 'FIRST',
			zipCodeState: {
				zipCode: '',
				zipCodeLoading:false,
				zipCodeInfo: null
			},
			emailState: {
				valid: false,
				email: ''
			},
			birthdateState: {
				valid: false,
				dateString: '',
				date: null,
				duration: null
			},
			carType: 'PERSONAL_CAR',
			enginePower: {
				value: '0',
				valid: false
			},
			engineSize: {
				value: '0',
				valid: false
			},
			carWeight: {
				value: '0',
				valid: false
			}
		});
	},
    calculatorState: null,
    init: function () {
		this.calculatorState = this.getDefaultCalculatorState();
    },
	validateZipCode: function(zipCode)
	{
		var re = /^\d{5}$/;
		return re.test(zipCode.replace(" ","").trim());
	},
    zipCodeUpdated: function (zipCode) {
		this.calculatorState.zipCodeState.zipCode = zipCode;
		if(!this.validateZipCode(zipCode))
		{
			this.calculatorState.zipCodeState.zipCodeInfo = {zipCode: zipCode, state: "NOT_VALID", name: null}
			this.trigger(this.calculatorState);
			return;
		}
		this.calculatorState.zipCodeState.zipCodeInfo = null;
		this.calculatorState.zipCodeState.zipCodeLoading = true;
		this.trigger(this.calculatorState);
		//load zip code info from the server, using promises
        WebApi.GetZipCodeInfo(zipCode).then(this.processZipCodeInfo);
    },
	//handle the zipcode api response
    processZipCodeInfo: function (data) {
		this.calculatorState.zipCodeState.zipCodeInfo = data;
		this.calculatorState.zipCodeState.zipCodeLoading = false;
        this.trigger(this.calculatorState);
    },
	validateEmail: function (email)
	{
		var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		return re.test(email);
	},
	emailUpdated: function (email)	{
		this.calculatorState.emailState.valid = this.validateEmail(email.trim());
		this.calculatorState.emailState.email = email;
		this.trigger(this.calculatorState);
	},
	birthdateUpdated: function (date)	{
		this.calculatorState.birthdateState.dateString = date;
		momentDate = Moment(date.trim(),"DD.MM.YYYY");
		this.calculatorState.birthdateState.valid = momentDate.isValid() && /^0?[1-9]|[12][0-9]|3[01]\. ?0?[1-9]|1[0-2]\. ?20[0-9]{2}$/.test(date);
		if(this.calculatorState.birthdateState.valid)
		{
			this.calculatorState.birthdateState.date = momentDate;
			var now = Moment(new Date());
			var diff = now.diff(this.calculatorState.birthdateState.date);
			var duration = Moment.duration(diff);
			var years = duration.asYears();
			this.calculatorState.birthdateState.years = years;
		}
		console.log('birthdateUpdated',Moment.locale(),this.calculatorState.birthdateState);
		this.trigger(this.calculatorState);
	},
	carTypeUpdated: function (carType)	{
		this.calculatorState.carType = carType;
		this.trigger(this.calculatorState);
	},
	setPage: function(page)
	{
		this.calculatorState.page = page;
		this.trigger(this.calculatorState);
	},
	isNormalInteger: function(str) {
		return /^\+?(0|[1-9]\d*)$/.test(str);
	},
	enginePowerUpdated: function(number)
	{
		this.calculatorState.enginePower.value = number;
		this.calculatorState.enginePower.valid = this.isNormalInteger(number);
		this.trigger(this.calculatorState);
	},
	engineSizeUpdated: function(number)
	{
		this.calculatorState.engineSize.value = number;
		this.calculatorState.engineSize.valid = this.isNormalInteger(number);
		this.trigger(this.calculatorState);
	},
	carWeightUpdated: function(number)
	{
		this.calculatorState.carWeight.value = number;
		this.calculatorState.carWeight.valid = this.isNormalInteger(number);
		this.trigger(this.calculatorState);
	}
});

module.exports = InsuranceCalculatorStore;