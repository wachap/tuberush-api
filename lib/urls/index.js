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
		var url = req.query.url;
		
		// ytdl options
		var options = {
			filter: function(format) { return format.container === 'mp4'; },
			downloadURL: true
		};

		var data;

		// function callback
		function postYtdl (callback) {
			ytdl.getInfo(url, options, function (err, info) {
				if (!err) {
					var title = info.title;
					var v720p = null;
					var v480p = null;
					var v360p = null;

					info.formats.forEach(getUrls);

					function getUrls (elem, index, array) {
						if (elem.container == "mp4" && elem.resolution == "720p") {
							if (v720p == null) {
								v720p = elem.url;
							};							
						};

						if (elem.container == "mp4" && elem.resolution == "480p") {
							if (v480p == null) {	
								v480p = elem.url;
							};							
						};

						if (elem.container == "mp4" && elem.resolution == "360p") {
							if (v360p == null) {
								v360p = elem.url;
							};							
						};
					};	

					data = 
					{
						"video": {
							"title": title,
							"links": 
							{
								"mp4": {
									"360p": v360p,
									"480p": v480p,
									"720p": v720p
								}
							}
							
						}
					};

				};
				callback(data);
		});

			
		};
		
		// callback data
		postYtdl(function (data) {			
			data = data;

			res
				.status(200)
				.header("Access-Control-Allow-Origin", "*")
				.json(data);
		});

	});

module.exports = app;
