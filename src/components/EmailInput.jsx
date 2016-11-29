var React = require('react');
var LazyInput = require('lazy-input');

var EmailInput = React.createClass({
	handleEmailChange: function(e)
	{
		if(this.props.onChange != null)
			this.props.onChange(e);
	},
	getCurrentEmailIconClassName: function()
	{
		if(this.props.emailState.email.length == 0)
			return "";
		if(this.props.emailState.valid)
			return "fa fa-check-circle-o fa-3 green input-icon";
		else
			return "fa fa-exclamation fa-3 red input-icon";
	},
    render: function() {
        return (
			<div className="row">
				<div className="six columns">
				    <LazyInput className="u-full-width" type="email" placeholder="jan.novak@email.cz" id={this.props.inputId} ref={this.props.inputRef} onChange={this.handleEmailChange} value={this.props.emailState.email}/>
				</div>
				<div className="six columns">
					<i className={this.getCurrentEmailIconClassName()}></i>
				</div>
			</div>
        );
    }
});
       
module.exports = EmailInput;
