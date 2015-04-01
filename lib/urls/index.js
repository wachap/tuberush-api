/**
 * Dependencies
 */
var app = require('express')();
var ytdl = require('ytdl-core');
var helperYtdl = require('./helper-ytdl.js')
// var logger = require('../logger');


/**
 * Local variables
 */


/**
 * Rutas
 */
app.route('/urls')
	
	// logging
	.all(function (req, res, next) {
		// logger.info(req.method, req.path, req.body);
		res.set('Content-Type','application/json');
		next();
	})
	
	// GET
	.get(function (req, res) {
		// get param "url"
		var url = req.query.url,
			video = new helperYtdl;

		

		// Paso la url del video al objeto
		video.setUrl(url);

		// Busco el video, le paso un cb con la res
		video.searchVideo(function (data) {			
			console.log(data);
			res
				.status(200)
				.header("Access-Control-Allow-Origin", "*")
				.json(data);
		});	
	});

module.exports = app;
