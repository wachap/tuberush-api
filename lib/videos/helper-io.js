/**
 * Dependencies
 */
var request = require('request');


/**
 * GLOBAL
 */
var PATH = "http://localhost:3000";


/**
 * Module export
 */
var HelperSocket = function (id, callback) {
	var url = PATH + '/videos/' + id;

	request(url, function (err, res, body) {
		callback(body);
	});
};

module.exports = HelperSocket;