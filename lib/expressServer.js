/**
 * Dependencies
 */
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
// Rutas 
var videos = require('./videos');


/**
 * Local variables
 */
var ExpressServer = function (config) {
	config = config || {};

	this.expressServer = express();

	// Middleware
	this.expressServer.use(bodyParser.urlencoded({extended: true}));
	this.expressServer.use(bodyParser.json('application/json'));
	this.expressServer.use(cors());

	// Rutas
	this.expressServer.use(videos);
};


/**
 * Expose ExpressServer
 */
module.exports = ExpressServer;