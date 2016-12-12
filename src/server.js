var express = require('express')
var app = express()
var zipCodes = null;

//static content
app.use('/font-awesome', express.static('../node_modules/font-awesome'))
app.use('/skeleton', express.static('./css/skeleton'))
app.use('/insurance-calculator', express.static('./css/insurance-calculator'))

//index page
app.get('/', function (req, res) {
  res.sendFile('./index.html', { root: __dirname })
})

//javascript
app.get('/bundle.js', function (req, res) {
  res.sendFile('./dist/minified/bundle.js', { root: __dirname })
})

//zip code rest api
app.get('/api/zipCode/:zipCode', function (req, res) {
  var zipCode = req.params.zipCode.replace(" ", "");
  console.log('zipCode query ' + zipCode);
  if(zipCodes == null)
  {
	  res.statusCode = 503;
	  res.send('Not ready');
  }
  else
  {
	var zipCodeInfo = null;
	for (var i = 0; i < zipCodes.length; i++) {
		if(zipCodes[i].PSC == zipCode)
		{
			zipCodeInfo = zipCodes[i];
			break;
		}
	}
	if(zipCodeInfo == null)
		res.json({ zipCode: req.params.zipCode, state: "NOT_FOUND", name: null });
	else
		res.json({ zipCode: req.params.zipCode, state: "FOUND", name: zipCodeInfo.NAZPOST });
  }
})

//load zip codes into memory
var Converter = require("csvtojson").Converter;
var converter = new Converter({
								 delimiter:';',
								 noheader:false
							  });
//TODO: load to hashtable instead of array for faster lookup
converter.fromFile("../doc/zv_pcobc.csv",function(err,result){
	zipCodes = result;
	console.log('Zip codes file ./doc/zv_pcobc.csv parsed', zipCodes)
});

//start web server listening
var port = process.env.port || 3000;
app.listen(port, function () {
  console.log('Insurance calculator web server started listening on port ' + port)
})