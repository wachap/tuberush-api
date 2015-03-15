/**
 * Dependencies
 */
var app = require('express')();
var request = require('request');
var cheerio = require('cheerio');
// var logger = require('../logger');

/**
 * Local variables
 */
var target = "http://keepvid.com/?url=";

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
		// get index of "id"
		var indice = url.indexOf('watch?v=') + 8;
		// obtener el id del video
		var id = url.substr(indice, 11);	

		var data;

		// function callback
		function postScrap (callback) {
			// scraping Keepvid 
			request(target+url, function (err, res, body) {
				if (!err && res.statusCode == 200) {
					// jquery load X'D
					$ = cheerio.load(body);

					post = $("#dl");
					info = post.find('#info');

					// guardamos el titulo del video
					title = info.find('a').eq(1).text();

					// guardamos enlaces
					v480p = post.find('a').eq(2);
					v480p = v480p[0].attribs.href;
					v720p = post.find('a').eq(3);
					v720p = v720p[0].attribs.href;

					// guardamos todo en un JSON
					data = 
					{
						"video": {
							"title": title,
							"links": [
								{
									"mp4": {
										"480p": v480p,
										"720p": v720p
									}
								}
							]
						}
					};				

					callback(data);						
				};
			});
		};
		
		// callback data
		postScrap(function (data){			
			data = data;
			res
				.status(200)
				.json(data);
		});

	});

module.exports = app;