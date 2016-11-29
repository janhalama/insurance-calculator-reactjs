var React = require('react');

var AdvancedDataViewer = React.createClass({
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
	renderPowerSizeViewer: function() {
		return(
			<div>
				<div className="row">
					<div className="three columns">
						<span>Výkon motoru</span>
					</div>
					<div className="nine columns">
						<span>{this.props.calculatorState.enginePower.value}</span><span> kW</span>
					</div>
				</div>
				<div className="row">
					<div className="three columns">
						<span>Obsah motoru</span>
					</div>
					<div className="nine columns">
						<span>{this.props.calculatorState.engineSize.value}</span><span> cm3</span>
					</div>
				</div>
			</div>
		);
	},
	renderCarWeightViewer: function() {
		return(
			<div>
				<div className="row">
					<div className="three columns">
						<span>Hmotnost automobilu</span>
					</div>
					<div className="nine columns">
						<span>{this.props.calculatorState.carWeight.value}</span><span> kg</span>
					</div>
				</div>
			</div>
		);
	},
    render: function() {
		switch(this.props.calculatorState.carType)
		{
			case 'MOTORBIKE':
			case 'PERSONAL_CAR':
				return (this.renderPowerSizeViewer());
			case 'BUSINESS_CAR':
			case 'LORRY_CAR':
			default:
				return (this.renderCarWeightViewer());
		}
	}
});
       
module.exports = AdvancedDataViewer;
