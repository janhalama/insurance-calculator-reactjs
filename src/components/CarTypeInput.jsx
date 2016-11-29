var React = require('react');
var CarTypeAdapter = require('../classes/CarTypeAdapter');

var CarTypeInput = React.createClass({
	handleChange: function(e)
	{
		if(this.props.onChange != null)
			this.props.onChange(e);
	},
    render: function() {
        return (
			<div className="row">
				<div className="six columns">
				    <select className="u-full-width" id={this.props.inputId} ref={this.props.inputRef} onChange={this.handleChange} value={this.props.value}>
						<option value="PERSONAL_CAR">{CarTypeAdapter.getCarTypeNameByCode('PERSONAL_CAR')}</option>
						<option value="MOTORBIKE">{CarTypeAdapter.getCarTypeNameByCode('MOTORBIKE')}</option>
						<option value="BUSINESS_CAR">{CarTypeAdapter.getCarTypeNameByCode('BUSINESS_CAR')}</option>
						<option value="LORRY_CAR">{CarTypeAdapter.getCarTypeNameByCode('LORRY_CAR')}</option>
					</select>
				</div>
			</div>
        );
    }
});
       
module.exports = CarTypeInput;
