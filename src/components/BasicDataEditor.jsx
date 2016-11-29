var React = require('react');
var InsuranceCalculatorActions = require('../actions/InsuranceCalculatorActions');
var ZipCodeInput = require('./ZipCodeInput');
var EmailInput = require('./EmailInput');
var BirthdateInput = require('./BirthdateInput');
var CarTypeInput = require('./CarTypeInput');

var BasicDataEditor = React.createClass({
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
    render: function() {
		return(
			<div>
				<label htmlFor="ic-id-zipCode">PSČ pojistníka</label>
				<ZipCodeInput inputId="ic-id-zipCode" inputRef="ic-ref-zipCode" onChange={this.handleZipCodeChange} zipCodeState={this.props.calculatorState.zipCodeState}></ZipCodeInput>
				<label htmlFor="ic-id-email">E-mail</label>
				<EmailInput inputId="ic-id-email" inputRef="ic-ref-email" onChange={this.handleEmailChange} emailState={this.props.calculatorState.emailState}></EmailInput>
				<label htmlFor="ic-id-dateOfBirth">Datum narození</label>
				<BirthdateInput inputId="ic-id-dateOfBirth" inputRef="ic-ref-dateOfBirth" onChange={this.handleBirthdateChange} birthdateState={this.props.calculatorState.birthdateState}></BirthdateInput>
				<label htmlFor="ic-id-car">Typ vozidla</label>
				<CarTypeInput inputId="ic-id-car" inputRef="ic-ref-carType" onChange={this.handleCarTypeChange} value={this.props.calculatorState.carType}></CarTypeInput>
			</div>
		);
	}
});
       
module.exports = BasicDataEditor;
