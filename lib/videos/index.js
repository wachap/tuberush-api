/**
 * Dependencies
 */
var app = require('express')();
var helperYtdl = require('./helper-ytdl.js')
// var logger = require('../logger');
var _ = require('lodash');


/**
 * Local variables
 */
var db = {};


/**
 * Rutas
 */
app.get('/videos', function(req, res) {
	var videos = _.values(db);

	res
		.status(200)
		.set('Content-Type','application/json')
		.json({
			videos: videos
		});
});

app.get('/videos/last', function(req, res) {
	var videos = _.values(db).slice(-5);

	res
		.status(200)
		.set('Content-Type','application/json')
		.json({
			videos: videos
		});
});

app.get('/videos/url', function (req, res) {
	res.set('Content-Type','application/json');

	// get param "url"
	var url = req.query.url,
		video = new helperYtdl;

	// Paso la url del video al objeto
	video.setUrl(url);
	// Busco el video, le paso un cb con la res
	video.searchVideo(function (data) {
		res
		.status(200)
		.header("Access-Control-Allow-Origin", "*")
		.json(data);
	});
});

app.route('/videos/:id?')

	// logging
	.all(function (req, res, next) {
		// logger.info(req.method, req.path, req.body);
		res.set('Content-Type','application/json');
		next();
	})

	// POST
	.post(function (req, res) {
		// manipulate request
		var videoNuevo = req.body.video;
		var videoViejo = db[videoNuevo.id];

		if (videoViejo == undefined) {
			videoNuevo.downloads = 1;

			// save to storage
			db[videoNuevo.id] = videoNuevo;
		} else {
			videoViejo.downloads += 1;
		};

		res
			.status(201)
			.json({
				video: db[videoNuevo.id]
			});
	});



module.exports = app;
