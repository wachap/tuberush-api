/**
 * Dependencies
 */
var express = require('express');
var bodyParser = require('body-parser');


/**
 * Local variables
 */
var server = express();


/**
 * Middleware
 */
server.use(bodyParser.json({ type: 'application/*+json' }));


/**
 * Rutas
 */
var urls = require('./lib/urls');
server.use(urls);


/**
 * Expose or start server
 */
if (!module.parent) {
	server.listen(3000, function () {
		console.log('escuchando en el puerto 3000');
	});	
} else {
	module.exports = server;
};