var React = require('react');
var LazyInput = require('lazy-input');

var ZipCodeInput = React.createClass({
	handleZipCodeChange: function(e)
	{
		if(this.props.onChange != null)
			this.props.onChange(e);
	},
	getCurrentZipCodeText: function() {
		var zipInfo = this.props.zipCodeState.zipCodeInfo
		if(zipInfo == null)
		{
			if(this.props.zipCodeState.zipCodeLoading)
				return 'kontroluji...';
			else
				return '';
		}
		else
		{
			switch(zipInfo.state)
			{
				case "NOT_VALID":
					return "Špatný formát PSČ";
				case "NOT_FOUND":
					return "PSČ neexistuje";
				case "FOUND":
					return zipInfo.name;
			}
		}
    },
	getCurrentZipCodeIconClassName: function()
	{
		var zipInfo = this.props.zipCodeState.zipCodeInfo;
		if(zipInfo == null)
		{
			return '';
		}
		else
		{
			switch(zipInfo.state)
			{
				case "NOT_VALID":
				case "NOT_FOUND":
					return "fa fa-exclamation fa-3 red input-icon";
				case "FOUND":
					return "fa fa-check-circle-o fa-3 green input-icon";
			}
		}
	},
    render: function() {
        return (
			<div className="row">
				<div className="six columns">
					<LazyInput className="u-full-width" placeholder="PSČ" ref={this.props.inputRef} id={this.props.inputId} type="text" onChange={this.handleZipCodeChange} value={this.props.zipCodeState.zipCode}/>
				</div>
				<div className="six columns">
					<i className={this.getCurrentZipCodeIconClassName()}></i><span className="input-message">{this.getCurrentZipCodeText()}</span>
				</div>
			</div>
        );
    }
});
       
module.exports = ZipCodeInput;
