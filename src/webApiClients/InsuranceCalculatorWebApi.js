var Request = require('superagent');
var Promise = require('promise');

var InsuranceCalculatorWebApi = {
    GetZipCodeInfo: function (zipCode) {
        return new Promise(function (resolve, reject) {
            Request
                .get('/api/zipCode/' + zipCode)
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (res.ok) {
                        resolve(res.body);
                    }
                    else
                        reject(err);
                })
        });
    }
};

module.exports = InsuranceCalculatorWebApi;