var ReactDom = require('react-dom');
var React = require('react');
var InsuranceCalculator = require('./components/InsuranceCalculator');

var App = {
	render: function (elementId) {
		ReactDom.render(React.createElement(InsuranceCalculator, null), document.getElementById(elementId));   
	}
}

//TODO: find better way how to expose App to be accessable from browser
if(window != null) window.App = App;