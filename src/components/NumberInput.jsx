var React = require('react');
var LazyInput = require('lazy-input');

var NumberInput = React.createClass({
	handleChange: function(e)
	{
		if(this.props.onChange != null)
			this.props.onChange(e);
	},
	getCurrentNumberText: function() {
		var number = this.props.number;
		if(!number.valid)
			return 'Zadejte celé kladné číslo';
		else
			return '';
    },
	getCurrentNumberIconClassName: function()
	{
		var number = this.props.number;
		if(!number.valid)
			return "fa fa-exclamation fa-3 red input-icon";
		else
			return "fa fa-check-circle-o fa-3 green input-icon";
	},
    render: function() {
        return (
			<div className="row">
				<div className="six columns">
					<LazyInput className="u-full-width" ref={this.props.inputRef} id={this.props.inputId} type="text" onChange={this.handleChange} value={this.props.number.value}/>
				</div>
				<div className="six columns">
					<i className={this.getCurrentNumberIconClassName()}></i><span className="input-message">{this.getCurrentNumberText()}</span>
				</div>
			</div>
        );
    }
});
       
module.exports = NumberInput;
