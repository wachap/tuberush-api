/**
 * Dependencies
 */
var http = require('http');
var ExpressServer = require('./lib/expressServer');
var socketIO = require('./lib/socketIO');


/**
 * Local variables
 */
var app = new ExpressServer();
var server = http.createServer(app.expressServer);
var Io  = new socketIO({server:server});


/**
 * Expose or start server
 */
if (!module.parent) {
	server.listen(3000, function () {
		console.log('escuchando en el puerto ' + server.address().port);
	});
} else {
	module.exports = server;
};