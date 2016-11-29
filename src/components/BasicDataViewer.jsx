var React = require('react');
var CarTypeAdapter = require('../classes/CarTypeAdapter');

var BasicDataViewer = React.createClass({
    render: function() {
		return (
			<div>
				<div className="row">
					<div className="three columns">
						<span>PSČ pojistníka</span>
					</div>
					<div className="nine columns">
						<span>{this.props.calculatorState.zipCodeState.zipCode}</span>
					</div>
				</div>
				<div className="row">
					<div className="three columns">
						<span>E-mail</span>
					</div>
					<div className="nine columns">
						<span>{this.props.calculatorState.emailState.email}</span>
					</div>
				</div>
				<div className="row">
					<div className="three columns">
						<span>Datum narození</span>
					</div>
					<div className="nine columns">
						<span>{this.props.calculatorState.birthdateState.dateString}</span>
					</div>
				</div>
				<div className="row">
					<div className="three columns">
						<span>Typ vozidla</span>
					</div>
					<div className="nine columns">
						<span>{CarTypeAdapter.getCarTypeNameByCode(this.props.calculatorState.carType)}</span>
					</div>
				</div>
			</div>);
    }
});
       
module.exports = BasicDataViewer;
