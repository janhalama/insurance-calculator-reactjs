var React = require('react');
var InsuranceCalculatorActions = require('../actions/InsuranceCalculatorActions');
var NumberInput = require('./NumberInput');

var AdvancedDataEditor = React.createClass({
	handleEnginePowerChange: function(e)
	{
		InsuranceCalculatorActions.enginePowerUpdated(e.target.value);
	},
	handleEngineSizeChange: function(e)
	{
		InsuranceCalculatorActions.engineSizeUpdated(e.target.value);
	},
	handleCarWeightChange: function(e)
	{
		InsuranceCalculatorActions.carWeightUpdated(e.target.value);
	},
	renderPowerSizeInputs: function() {
		return(
			<div>
				<label htmlFor="ic-id-enginePower">Výkon motoru [kW]</label>
				<NumberInput inputId="ic-id-enginePower" inputRef="ic-ref-enginePower" onChange={this.handleEnginePowerChange} number={this.props.calculatorState.enginePower}></NumberInput>
				<label htmlFor="ic-id-engineSize">Obsah motoru [cm3]</label>
				<NumberInput inputId="ic-id-engineSize" inputRef="ic-ref-engineSize" onChange={this.handleEngineSizeChange} number={this.props.calculatorState.engineSize}></NumberInput>
			</div>
		);
	},
	renderCarWeightInput: function() {
		return(
			<div>
				<label htmlFor="ic-id-carWeight">Hmotnost automobilu [kg]</label>
				<NumberInput inputId="ic-id-carWeight" inputRef="ic-ref-carWeight" onChange={this.handleCarWeightChange} number={this.props.calculatorState.carWeight}></NumberInput>
			</div>
		);
	},
    render: function() {
		switch(this.props.calculatorState.carType)
		{
			case 'MOTORBIKE':
			case 'PERSONAL_CAR':
				return (this.renderPowerSizeInputs());
			case 'BUSINESS_CAR':
			case 'LORRY_CAR':
			default:
				return (this.renderCarWeightInput());
		}
	}
});
       
module.exports = AdvancedDataEditor;
