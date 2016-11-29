var React = require('react');
var Reflux = require('reflux');
var InsuranceCalculatorActions = require('../actions/InsuranceCalculatorActions');
var InsuranceCalculatorStore = require('../stores/InsuranceCalculatorStore');
var BasicDataViewer = require('./BasicDataViewer');
var BasicDataEditor = require('./BasicDataEditor');
var AdvancedDataEditor = require('./AdvancedDataEditor');
var AdvancedDataViewer = require('./AdvancedDataViewer');
var InsuranceCalculationService = require('../classes/InsuranceCalculationService');


var InsuranceCalculator = React.createClass({
	mixins: [Reflux.connect(InsuranceCalculatorStore,"calculatorState")],
    propTypes: {
    },
    getInitialState: function() {
		return {
				calculatorState: InsuranceCalculatorStore.getDefaultCalculatorState()
		};
    },
	handleZipCodeChange: function(e)
	{
		InsuranceCalculatorActions.zipCodeUpdated(e.target.value);
	},
	handleEmailChange: function(e)
	{
		InsuranceCalculatorActions.emailUpdated(e.target.value);
	},
	handleBirthdateChange: function(e)
	{
		InsuranceCalculatorActions.birthdateUpdated(e.target.value);
	},
	handleCarTypeChange: function(e)
	{
		InsuranceCalculatorActions.carTypeUpdated(e.target.value);
	},
	handleFirstPageNextButtonClick: function()
	{
		if(!this.AreFirstPageInputsValid())
			return;
		InsuranceCalculatorActions.setPage('SECOND');
	},
	handleSecondPageBackButtonClick: function()
	{
		InsuranceCalculatorActions.setPage('FIRST');
	},
	handleSecondPageNextButtonClick: function()
	{
		if(!this.AreSecondPageInputsValid())
			return;
		InsuranceCalculatorActions.setPage('THIRD');
	},
	handleThirdPageBackButtonClick: function()
	{
		InsuranceCalculatorActions.setPage('SECOND');
	},
	AreFirstPageInputsValid: function()
	{
		
		var cState = this.state.calculatorState;
		var result = cState.zipCodeState.zipCodeInfo != null && cState.zipCodeState.zipCodeInfo.state == "FOUND" && cState.emailState.valid && 
			   cState.birthdateState.valid && cState.birthdateState.years >= 18 && 
			   cState.birthdateState.date.year() > 1900;
		return result;
	},
	AreSecondPageInputsValid: function()
	{
		var cState = this.state.calculatorState;
		switch(cState.carType)
		{
			case 'MOTORBIKE':
			case 'PERSONAL_CAR':
				return cState.enginePower.valid && cState.engineSize.valid;
			case 'BUSINESS_CAR':
			case 'LORRY_CAR':
			default:
				return cState.carWeight.valid;
		}
	},
	renderFirstPage: function()
	{
		return (
			<div className="row">
				<div className="three columns">&nbsp;</div>
				<div className="six columns">
					<h1>Kalkulačka povinného ručení</h1>
					<h2>Obecné údaje</h2>
					<BasicDataEditor calculatorState={this.state.calculatorState}/>
					<div className="row">
						<div className="nine columns">
							&nbsp;
						</div>
						<div className="three columns">
							<button className={this.AreFirstPageInputsValid()?"button-primary u-full-width":"u-full-width"} onClick={this.handleFirstPageNextButtonClick}>Další</button>
						</div>
					</div>
				</div>
				<div className="three columns">&nbsp;</div>
			</div>
        );
	},
	renderSecondPage: function()
	{
		return (
		<div className="row">
				<div className="three columns">&nbsp;</div>
				<div className="six columns">
					<h1>Kalkulačka povinného ručení</h1>
					<h2>Obecné údaje</h2>
					<BasicDataViewer calculatorState={this.state.calculatorState}/>
					<h2>Dodatečné údaje</h2>
					<AdvancedDataEditor calculatorState={this.state.calculatorState}/>
					<div className="row">
						<div className="three columns">
							<button className={"u-full-width"} onClick={this.handleSecondPageBackButtonClick}>Zpět</button>
						</div>
						<div className="six columns">
							&nbsp;
						</div>
						<div className="three columns">
							<button className={this.AreSecondPageInputsValid()?"button-primary u-full-width":"u-full-width"} onClick={this.handleSecondPageNextButtonClick}>Další</button>
						</div>
					</div>
				</div>
				<div className="three columns">&nbsp;</div>
			</div>);
	},
	renderThirdPage: function()
	{
		return (
		<div className="row">
				<div className="three columns">&nbsp;</div>
				<div className="six columns">
					<h1>Kalkulačka povinného ručení</h1>
					<h2>Obecné údaje</h2>
					<BasicDataViewer calculatorState={this.state.calculatorState}/>
					<h2>Dodatečné údaje</h2>
					<AdvancedDataViewer calculatorState={this.state.calculatorState}/>
					<h2>Vaše pojistné je</h2>
					<div className="row">
						<div className="twelve columns">
							<h1 className="green">{InsuranceCalculationService.CalculateInsurance(this.state.calculatorState)} Kč</h1>
						</div>
					</div>
					<div className="row"></div>
					<div className="row">
						<div className="three columns">
							<button className={"u-full-width"} onClick={this.handleThirdPageBackButtonClick}>Zpět</button>
						</div>
						<div className="nine columns">
							&nbsp;
						</div>
					</div>
				</div>
				<div className="three columns">&nbsp;</div>
			</div>);
	},
    render: function() {
		switch(this.state.calculatorState.page)
		{
			case "FIRST":
			default:
				return(this.renderFirstPage());
			case "SECOND":
				return(this.renderSecondPage());
			case "THIRD":
				return(this.renderThirdPage());
		}
    }
});
       
module.exports = InsuranceCalculator;
