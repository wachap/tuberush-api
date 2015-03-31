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
var target = "http://es.savefrom.net/savefrom.php";
var headers = 
{ 
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36',
    'Content-Type' : 'application/x-www-form-urlencoded',
    'Cookie': 'lang=es; rmode=false; exp_m=0; _ga=GA1.2.438321450.1426802183; PHPSESSUD=08ab8b3438515dbb358578747e3a96f5; PHPSESSID=2tnemqkbq534s3ii5ks2o7okl7'
};

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
			request.post({url: target, form: {sf_url: url}, headers: headers, jar: true}, function (err, res, body) {
				if (!err && res.statusCode == 200) {
					// jquery load X'D
					$ = cheerio.load(body);

					info = $(".info-box");

					// guardamos el titulo del video
					title = info.find('.file-name').val();
					// guardamos enlaces
					v480p = info.find('.link-download').eq(1);
					// console.log(body);
					console.log('titulo '+title);
					// console.log( v480p.attr("href") );
					// v480p = v480p[0].attribs.href;
					// v720p = post.find('.link-download ga_track_events').eq(1);
					// v720p = v720p[0].attribs.href;

					data = 
					{
						"video": {
							"title": title,
							"links": 
							{
								"mp4": {
									"480p": "v480p",
									"720p": "v720p"
								}
							}
							
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
				.header("Access-Control-Allow-Origin", "*")
				.json(data);
		});

	});

module.exports = app;