var React = require('react');
var LazyInput = require('lazy-input');

var BirthdateInput = React.createClass({
	handleChange: function(e)
	{
		if(this.props.onChange != null)
			this.props.onChange(e);
	},
	getCurrentBirthdateIconClassName: function()
	{
		if(this.props.birthdateState.dateString.length == 0)
			return "";
		if(this.props.birthdateState.valid)
		{
			if(this.props.birthdateState.years >= 18 && this.props.birthdateState.date.year() > 1900)
				return "fa fa-check-circle-o fa-3 green input-icon";
			else
				return "fa fa-exclamation fa-3 red input-icon";
		}
		else
			return "fa fa-exclamation fa-3 red input-icon";
	},
    render: function() {
        return (
			<div className="row">
				<div className="six columns">
				    <LazyInput className="u-full-width" type="text" placeholder="1.12.1990" id={this.props.inputId} ref={this.props.inputRef} onChange={this.handleChange} value={this.props.birthdateState.dateString}/>
				</div>
				<div className="six columns">
					<i className={this.getCurrentBirthdateIconClassName()}></i>
				</div>
			</div>
        );
    }
});
       
module.exports = BirthdateInput;
